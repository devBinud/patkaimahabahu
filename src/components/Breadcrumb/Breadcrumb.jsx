import { Link } from 'react-router-dom'
import './Breadcrumb.css'

export default function Breadcrumb({ currentPage, parentPage, parentLink }) {
  return (
    <div className="page-breadcrumb-strip">
      <div className="breadcrumb-strip-container">
        <nav className="breadcrumb-nav" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          {parentPage && (
            <>
              <span className="breadcrumb-arrow">›</span>
              <Link to={parentLink || '/'} className="breadcrumb-link">{parentPage}</Link>
            </>
          )}
          <span className="breadcrumb-arrow">›</span>
          <span className="breadcrumb-current">{currentPage}</span>
        </nav>
      </div>
    </div>
  )
}
