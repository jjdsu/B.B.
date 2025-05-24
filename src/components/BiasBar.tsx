import React from 'react'
import styled from 'styled-components'
import { theme } from '../theme'

const Container = styled.div`
  width: 100%;
  height: 12px;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.s};
`

const Segment = styled.div<{ width: number; color: string }>`
  width: ${({ width }) => width}%;
  height: 100%;
  background: ${({ color }) => color};
  float: left;
`

type Props = {
  progressiveRatio: number;   // 0 ~ 1 사이
  conservativeRatio: number;  // 0 ~ 1 사이
}

export default function BiasBar({ progressiveRatio, conservativeRatio }: Props) {
  return (
    <Container>
      <Segment
        width={progressiveRatio * 100}
        color={theme.colors.progress}
      />
      <Segment
        width={conservativeRatio * 100}
        color={theme.colors.conservative}
      />
    </Container>
  )
}
