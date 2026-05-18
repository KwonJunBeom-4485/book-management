'use client';

export default function BookSkeleton() {
    // 💡 테이블 셀 안에서 일렁일 공통 스켈레톤 바 스타일
    const baseBar = {
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        animation: 'skeleton-row-pulse 1.5s infinite ease-in-out',
    };

    return (
        <tr style={{ borderBottom: '1px solid #f1f5f9', height: '53px' }}>
            {/* ID 칸 스켈레톤 */}
            <td style={{ padding: '14px 20px' }}>
                <div style={{ ...baseBar, width: '25px', height: '14px' }} />
            </td>

            {/* 도서명 칸 스켈레톤 */}
            <td style={{ padding: '14px 20px' }}>
                <div style={{ ...baseBar, width: '180px', height: '14px' }} />
            </td>

            {/* 저자 칸 스켈레톤 */}
            <td style={{ padding: '14px 20px' }}>
                <div style={{ ...baseBar, width: '90px', height: '14px' }} />
            </td>

            {/* 가격 칸 스켈레톤 */}
            <td style={{ padding: '14px 20px' }}>
                <div style={{ ...baseBar, width: '65px', height: '14px' }} />
            </td>

            {/* 대출 상태 알약 배지 스켈레톤 (둥글게 20px 매칭) */}
            <td style={{ padding: '14px 20px' }}>
                <div style={{
                    ...baseBar,
                    width: '64px',
                    height: '24px',
                    borderRadius: '20px',
                    backgroundColor: '#e5e7eb'
                }} />
            </td>

            {/* 관리 (정보 수정) 버튼 스켈레톤 */}
            <td style={{ padding: '14px 20px' }}>
                <div style={{
                    ...baseBar,
                    width: '74px',
                    height: '29px',
                    borderRadius: '6px'
                }} />
            </td>
        </tr>
    );
}