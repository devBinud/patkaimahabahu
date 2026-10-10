import { FaPlay } from 'react-icons/fa6'
import './VideoCoverageCard.css'

// Media coverage video card, shared by the News & Media page grid and the
// homepage slider: 16:9 thumbnail (the card's only link, with a static play
// badge), then a red source badge, title and description. No hover effects.
// `focusable={false}` takes the link out of the tab order (used for slider
// cards that are off screen).
export default function VideoCoverageCard({ video, focusable = true }) {
  return (
    <article className="news-video-card">
      <a
        href={video.link}
        target="_blank"
        rel="noopener noreferrer"
        className="news-video-thumb"
        tabIndex={focusable ? undefined : -1}
        draggable={false}
        aria-label={`Watch "${video.title}" on ${video.platform} (opens in a new tab)`}
      >
        <img
          src={video.thumbnail}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          style={video.thumbPosition ? { objectPosition: video.thumbPosition } : undefined}
        />
        <span className="news-video-play">
          <FaPlay size={20} />
        </span>
      </a>

      <div className="news-video-body">
        <span className="news-video-source">{video.source}</span>
        <h3 className="news-video-title">{video.title}</h3>
        <p className="news-video-desc">{video.desc}</p>
      </div>
    </article>
  )
}
