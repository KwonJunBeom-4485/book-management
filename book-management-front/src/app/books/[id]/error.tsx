'use client'; // 💡 Next.js 규칙: Error 컴포넌트는 반드시 Client Component여야 함

import { useEffect } from 'react';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void; // 💡 재시도 기능을 제공하는 넥스트 내장 함수
}

export default function BookDetailError({ error, reset }: ErrorProps) {
    useEffect(() => {
        // 로깅 도구에 에러 기록용
        console.error('런타임 에러 감지됨:', error);
    }, [error]);

    return (
        <div style={{ padding: '80px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h2 style={{ fontSize: '2.2rem', color: '#ea4335', marginBottom: '16px', fontWeight: 'bold' }}>
                🚨 시스템 오류가 발생했습니다
            </h2>
            <p style={{ color: '#4b5563', fontSize: '1.05rem', marginBottom: '12px' }}>
                백엔드 API 서버 통신 실패 또는 일시적인 시스템 장애 상태입니다.
            </p>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '32px', fontFamily: 'monospace' }}>
                [{error.message}]
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                {/* 에러 상태를 복구하고 다시 fetch를 쏘도록 유도하는 내장 reset */}
                <button
                    onClick={() => reset()}
                    style={{
                        padding: '12px 24px', backgroundColor: '#34a853', color: '#fff',
                        border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer'
                    }}
                >
                    🔄 다시 시도하기
                </button>
                <button
                    onClick={() => window.location.href = '/'}
                    style={{
                        padding: '12px 24px', backgroundColor: '#fff', color: '#4b5563',
                        border: '1px solid #d1d5db', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer'
                    }}
                >
                    🏠 홈으로 이동
                </button>
            </div>
        </div>
    );
}