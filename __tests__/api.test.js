/**
 * API Utilities Tests
 */

import { fetchWithTimeout } from '../src/utils/api';

// Mock global fetch
global.fetch = jest.fn();

describe('API Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should fetch data successfully', async () => {
    // Mock successful fetch response
    const mockResponse = { data: 'test' };
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    });

    // Call fetchWithTimeout
    const promise = fetchWithTimeout('https://test.com', {}, 1000);
    
    // Resolve promise
    const result = await promise;
    const data = await result.json();
    
    // Check fetch was called correctly
    expect(global.fetch).toHaveBeenCalledWith('https://test.com', {});
    
    // Check result is correct
    expect(data).toEqual(mockResponse);
  });

  it('should timeout after specified time', async () => {
    // Mock fetch function that never resolves
    global.fetch.mockImplementationOnce(() => new Promise((resolve) => {
      // This will never resolve in the test
    }));

    // Call fetchWithTimeout with short timeout
    const promise = fetchWithTimeout('https://test.com', {}, 1000);
    
    // Advance timers to trigger timeout
    jest.advanceTimersByTime(1500);
    
    // Check promise rejects with timeout error
    await expect(promise).rejects.toThrow('Request timeout');
  });

  it('should pass through fetch errors', async () => {
    // Mock fetch error
    const mockError = new Error('Network error');
    global.fetch.mockRejectedValueOnce(mockError);

    // Call fetchWithTimeout
    const promise = fetchWithTimeout('https://test.com', {}, 1000);
    
    // Check error is passed through
    await expect(promise).rejects.toThrow('Network error');
  });
}); 