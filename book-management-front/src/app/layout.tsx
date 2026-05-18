'use client';
import { useState } from 'react';
import Link from 'next/link';
// 💡 현재 브라우저의 URL 경로를 감지하기 위해 usePathname 임포트
import { usePathname } from 'next/navigation';

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname(); // 현재 경로 추출 (예: "/" 또는 "/register")
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    // 💡 Active(선택됨) 상태와 Hover 상태를 종합하여 동적 스타일 반환
    const navLinkStyle = (targetPath: string, index: number) => {
        const isActive = pathname === targetPath; // 현재 보고 있는 페이지인가?
        const isHovered = hoveredIdx === index;   // 마우스가 올라가 있는가?

        return {
            // 선택되었거나 호버 중이면 글자색을 완전 선명한 화이트(#fff)로 변경
            color: isActive || isHovered ? '#ffffff' : '#9ca3af',

            // 1. 선택된 상태: 선명한 회색(#4b5563) 고정
            // 2. 호버 상태: 연한 차콜색(#374151) 노출
            // 3. 기본 상태: 배경 없음(transparent)
            backgroundColor: isActive
                ? '#4b5563'
                : isHovered ? '#374151' : 'transparent',

            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: '600',
            padding: '8px 16px',
            borderRadius: '6px',
            transition: 'all 0.15s ease-in-out',
            display: 'inline-block'
        };
    };

    return (
        <html lang="ko">
        <body style={{ margin: 0, padding: 0, fontFamily: 'sans-serif', backgroundColor: '#fff' }} suppressHydrationWarning>

        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 40px',
            height: '60px',
            backgroundColor: '#1f2937',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            {/* 좌측 로고 링크 */}
            <Link href="/" style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#f9fafb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                📚 도서 통합 관리
            </Link>

            {/* 우측 네비게이션 링크 그룹 */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>

                {/* 1. 도서 목록 메뉴 (경로: "/") */}
                <Link
                    href="/"
                    style={navLinkStyle('/', 0)}
                    onMouseEnter={() => setHoveredIdx(0)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onMouseDown={(e) => e.currentTarget.style.opacity = '0.7'}
                    onMouseUp={(e) => e.currentTarget.style.opacity = '1'}
                >
                    도서 목록
                </Link>

                {/* 2. 신규 도서 등록 메뉴 (경로: "/register") */}
                <Link
                    href="/register"
                    style={navLinkStyle('/register', 1)}
                    onMouseEnter={() => setHoveredIdx(1)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onMouseDown={(e) => e.currentTarget.style.opacity = '0.7'}
                    onMouseUp={(e) => e.currentTarget.style.opacity = '1'}
                >
                    신규 도서 등록
                </Link>
            </div>
        </nav>

        <main>
            {children}
        </main>

        </body>
        </html>
    );
}