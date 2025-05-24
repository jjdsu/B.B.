import React, { useEffect, useState } from 'react'
import styled, {ThemeProvider} from 'styled-components'
import { analyzeArticle, AnalysisResult } from '../utils/fetchAnalysis'
import {theme} from '../theme'
import BiasBar from './BiasBar'

const PanelWrapper = styled.div`
  position: fixed;
  top: 0; right: 0;
  width: 400px; height: 100%;
  background: ${({ theme }) => theme.colors.secondary};
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  padding: ${({ theme }) => theme.spacing.s};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textLight};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1.2rem;
  cursor: pointer;
`

const Content = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.m};
  color: ${({ theme }) => theme.colors.textDark};
  overflow-y: auto;
  line-height: 1.5;
`

type Props = { onClose: () => void }

export default function AnalysisPanel({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(true)
  const [data, setData]     = useState<AnalysisResult | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const text = document.body.innerText
        const result = await analyzeArticle(text)
        setData(result)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <PanelWrapper>
        <Header>
          <h3>분석 결과</h3>
          <CloseBtn onClick={onClose}>×</CloseBtn>
        </Header>

        <Content>
          {loading || !data ? (
            '데이터 불러오는 중…'
          ) : (
            <>
              {/* 주제 표현 */}
              <p style={{ marginBottom: theme.spacing.m }}>
                이 기사는 <strong>{data.topic}</strong>을(를) 주제로 한 기사입니다.
              </p>

              {/* 진보·보수 비율 */}
              <BiasBar
                progressiveRatio={data.biasScore}
                conservativeRatio={1 - data.biasScore}
              />
              <p>
                진보 <strong>{Math.round(data.biasScore * 100)}%</strong> &nbsp; | &nbsp;
                보수 <strong>{Math.round((1 - data.biasScore) * 100)}%</strong>
              </p>

              {/* 요약 텍스트 */}
              <div style={{ whiteSpace: 'pre-wrap', marginTop: theme.spacing.m }}>
                {data.summary}
              </div>
            </>
          )}
        </Content>
      </PanelWrapper>
    </ThemeProvider>
  )
}