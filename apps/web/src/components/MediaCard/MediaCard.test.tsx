import { beforeEach, describe, expect, it } from 'bun:test'
import { screen } from '@testing-library/react'
import { MediaCard } from '@/components/MediaCard/MediaCard'
import { setBrowserSupport } from '@/test/canPlay'
import { mediaItem } from '@/test/fixtures'
import { renderWithProviders } from '@/test/render'

describe('MediaCard', () => {
  // Chrome's answers: Matroska and HEVC yes, Dolby audio no.
  beforeEach(() => setBrowserSupport((mime) => !mime.includes('ec-3') && !mime.includes('ac-3')))

  it('links to the player with the title, runtime and resolution', () => {
    renderWithProviders(<MediaCard media={mediaItem()} />)
    expect(screen.getByRole('link', { name: 'Busboys (2026)' })).toHaveAttribute('href', '/watch/7')
    expect(screen.getByText('1h 37m')).toBeInTheDocument()
    expect(screen.getByText('1080p')).toBeInTheDocument()
    expect(screen.queryByText("Won't play in this browser")).toBeNull()
  })

  it('warns before a click when the browser cannot decode the audio', () => {
    renderWithProviders(<MediaCard media={mediaItem({ audioCodec: 'eac3' })} />)
    expect(screen.getByText("Won't play in this browser")).toHaveAttribute(
      'title',
      "Dolby Digital Plus audio isn't supported here.",
    )
  })

  it('shows a placeholder until the thumbnail exists', () => {
    const { container } = renderWithProviders(
      <MediaCard media={mediaItem({ thumbnail: 'pending' })} />,
    )
    expect(container.querySelector('img')).toBeNull()
  })
})
