'use client';

export default function BookDetailSkeleton() {
    // 💡 실제 컴포넌트의 폰트 및 백그라운드 색상 조합과 밀도 일치
    const basePulse = {
        backgroundColor: '#e5e7eb',
        borderRadius: '6px',
        animation: 'skeleton-smooth-pulse 1.5s infinite ease-in-out',
    };

    return (
        <div style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            {/* 1. 뒤로가기 링크 버튼 매칭 (color: '#0070f3' 톤앤매너 반영) */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ ...basePulse, width: '150px', height: '15px', backgroundColor: '#bfdbfe' }} />
            </div>

            {/* 2. 타이틀 헤더 매칭 (fontSize: '1.8rem', margin: '0 0 8px 0') */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 8px 0', height: '34px' }}>
                <div style={{ ...basePulse, width: '30px', height: '28px' }} /> {/* 이모지 파트 */}
                <div style={{ ...basePulse, width: '260px', height: '24px' }} /> {/* 텍스트 파트 */}
            </div>

            {/* 시스템 고유 번호 매칭 (color: '#6b7280', fontSize: '0.9rem', marginBottom: '24px') */}
            <div style={{ ...basePulse, width: '130px', height: '14px', marginBottom: '24px' }} />

            {/* 3. 메타 정보 카드 박스 (배경, 패딩, 보더, 갭 완벽 대치) */}
            <div style={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginBottom: '28px'
            }}>
                {/* 발급 ISBN 행 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '18px' }}>
                    <div style={{ ...basePulse, width: '65px', height: '13px' }} />
                    <div style={{ ...basePulse, width: '110px', height: '13px' }} />
                </div>
                {/* 시스템 최초 등록일 (borderTop: '1px dashed #e5e7eb', paddingTop: '8px') */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #e5e7eb', paddingTop: '8px', height: '26px' }}>
                    <div style={{ ...basePulse, width: '115px', height: '13px' }} />
                    <div style={{ ...basePulse, width: '140px', height: '13px' }} />
                </div>
                {/* 최종 정보 수정일 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '18px' }}>
                    <div style={{ ...basePulse, width: '100px', height: '13px' }} />
                    <div style={{ ...basePulse, width: '140px', height: '13px' }} />
                </div>
            </div>

            {/* 4. 입력 폼 섹션 (gap: '18px' 매칭) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

                {/* 도서명 인풋 박스 스켈레톤 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ ...basePulse, width: '45px', height: '14px' }} /> {/* 라벨 */}
                    <div style={{ width: '100%', height: '41px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', padding: '10px' }}>
                        <div style={{ ...basePulse, width: '120px', height: '15px' }} />
                    </div>
                </div>

                {/* 저자명 인풋 박스 스켈레톤 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ ...basePulse, width: '45px', height: '14px' }} /> {/* 라벨 */}
                    <div style={{ width: '100%', height: '41px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', padding: '10px' }}>
                        <div style={{ ...basePulse, width: '80px', height: '15px' }} />
                    </div>
                </div>

                {/* 가격 및 출판 연도 가로 배치 그리드 (gap: '16px', flex: 1 분할 완벽 매칭) */}
                <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ ...basePulse, width: '55px', height: '14px' }} />
                        <div style={{ width: '100%', height: '41px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', padding: '10px' }}>
                            <div style={{ ...basePulse, width: '40px', height: '15px' }} />
                        </div>
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ ...basePulse, width: '95px', height: '14px' }} />
                        <div style={{ width: '100%', height: '41px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', padding: '10px' }}>
                            <div style={{ ...basePulse, width: '45px', height: '15px' }} />
                        </div>
                    </div>
                </div>

                {/* 현재 대출 상태 관리 셀렉트 박스 스켈레톤 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ ...basePulse, width: '110px', height: '14px' }} />
                    <div style={{ width: '100%', height: '41px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', padding: '10px' }}>
                        <div style={{ ...basePulse, width: '140px', height: '15px' }} />
                    </div>
                </div>

                {/* 5. 하단 액션 버튼 그룹 (flex: 2 대 flex: 1 비율, marginTop: '16px', 높이 45px 정밀 세팅) */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                    {/* 저장 버튼 자리 (backgroundColor: '#2ea44f' 소프트톤 매칭) */}
                    <div style={{ ...basePulse, flex: 2, height: '45px', backgroundColor: '#a7f3d0' }} />
                    {/* 삭제 버튼 자리 (backgroundColor: '#cf222e' 소프트톤 매칭) */}
                    <div style={{ ...basePulse, flex: 1, height: '45px', backgroundColor: '#fca5a5' }} />
                </div>
            </div>

            {/* 하이드레이션 격리형 표준 키프레임 */}
            <style>{`
                @keyframes skeleton-smooth-pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.45; }
                }
            `}</style>
        </div>
    );
}