import { describe, it, expect } from 'vitest'
import dotenv from 'dotenv'
// 유효하지 않은 API 호출 추가에 대한 test

// .env 파일 로드
dotenv.config()

const BASE_URL = process.env.VUE_APP_API_BASE_URL

// api 호출 테스트
describe('API URL Validation', () => {
  it('should match valid API URL format', () => {
    const validApiUrl = `${BASE_URL}/api/resource`
    expect(validApiUrl).toMatch(/^http:\/\/127\.0\.0\.1:8000\/[a-zA-Z0-9\-_/]*$/)
  })

  it('should fail for invalid API URL format', () => {
    const invalidApiUrl = 'http://localhost:3000/api/resource'
    expect(invalidApiUrl).not.toMatch(/^http:\/\/127\.0\.0\.1:8000\/[a-zA-Z0-9\-_/]*$/)
  })
})
