import { useState } from 'react'
import './App.css'

const opportunities = [
  { id: 1, company: 'Wipro', title: 'Web Development Internship', type: 'Internships', location: 'Remote', tags: ['HTML', 'CSS', 'JavaScript'], description: 'Sample listing for students interested in web development.' },
  { id: 2, company: 'Infosys', title: 'Python Developer Internship', type: 'Internships', location: 'Bangalore', tags: ['Python', 'SQL'], description: 'Sample opportunity for students interested in Python.' },
  { id: 3, company: 'Tata', title: 'Graduate Trainee', type: 'Jobs', location: 'Pune', tags: ['Java', 'Problem Solving'], description: 'Sample entry-level role for students exploring careers.' },
  { id: 4, company: 'Campus Connect', title: 'Campus Coding Challenge', type: 'Competitions', location: 'Online', tags: ['Coding', 'Teamwork'], description: 'Sample student competition to practise coding.' },
  { id: 5, company: 'Campus Connect', title: 'Frontend Mini Hackathon', type: 'Hackathons', location: 'Online', tags: ['HTML', 'CSS', 'React'], description: 'Sample hackathon for building a small web project.' },
  { id: 6, company: 'Campus Connect', title: 'Career Guidance Session', type: 'Mentorship', location: 'Online', tags: ['Career', 'Guidance'], description: 'Sample mentoring session about career planning.' },
  { id: 7, company: 'Campus Connect', title: 'Java Practice Test', type: 'Mock Tests', location: 'Online', tags: ['Java', 'OOP', 'Practice'], description: 'Sample practice activity for Java fundamentals.' },
]

const categories = [
  { name: 'Home', icon: '⌂' },
  { name: 'Internships', icon: '▣' },
  { name: 'Jobs', icon: '▤' },
  { name: 'Competitions', icon: '🏆' },
  { name: 'Hackathons', icon: '⌘' },
  { name: 'Mock Tests', icon: '📝' },
  { name: 'Mentorship', icon: '🎓' },
]

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('Student')
  const [authError, setAuthError] = useState('')
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('All')
  const [selectedItem, setSelectedItem] = useState(null)

  function handleAuth(event) {
    event.preventDefault()
    setAuthError('')

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

    if (!emailPattern.test(email)) {
      setAuthError('Please enter a valid email address.')
      return
    }
    if (!passwordPattern.test(password)) {
      setAuthError('Use 8+ characters, including uppercase, lowercase, a number and a special symbol.')
      return
    }
    if (isSignup && password !== confirmPassword) {
      setAuthError('The passwords do not match.')
      return
    }

    // Frontend demo only: this does not create or verify a real account.
    setIsLoggedIn(true)
    setSearch('')
    setActiveTab('All')
  }

  function changeAuthMode(signup) {
    setIsSignup(signup)
    setAuthError('')
    setConfirmPassword('')
  }

  function logOut() {
    setIsLoggedIn(false)
    setPassword('')
    setConfirmPassword('')
    setAuthError('')
    setIsSignup(false)
  }

  const filteredOpportunities = opportunities.filter((item) => {
    const matchesTab = activeTab === 'All' || item.type === activeTab
    const query = search.trim().toLowerCase()
    const text = [item.title, item.company, item.type, item.location, ...item.tags].join(' ').toLowerCase()
    return matchesTab && text.includes(query)
  })

  // LOGIN AND SIGNUP SCREEN: shown first on every page load.
  if (!isLoggedIn) {
    return (
      <div className="auth-page">
        <section className="auth-promo">
          <a className="brand" href="#auth"><span className="brand-icon">CC</span> Campus Connect</a>
          <div className="promo-copy">
            <span className="eyebrow">YOUR FUTURE STARTS HERE</span>
            <h1>Small steps today.<br /><span>Big opportunities tomorrow.</span></h1>
            <p>Discover internships, explore careers and find new ways to learn, grow and build your future.</p>
            <div className="promo-points">
              <p>💼 <strong>Explore careers</strong></p>
              <p>🏆 <strong>Show your skills</strong></p>
              <p>🎓 <strong>Keep learning</strong></p>
            </div>
          </div>
          <small>Made for students, by Campus Connect.</small>
        </section>

        <section className="auth-area">
          <form className="auth-card" onSubmit={handleAuth}>
            <div className="auth-mobile-brand"><span className="brand-icon">CC</span> Campus Connect</div>
            <span className="eyebrow">{isSignup ? 'CREATE YOUR PROFILE' : 'WELCOME BACK'}</span>
            <h2>{isSignup ? 'Create an account' : 'Sign in to continue'}</h2>
            <p className="auth-subtitle">{isSignup ? 'Join the community and explore opportunities.' : 'Your next opportunity could be a click away.'}</p>

            <div className="auth-tabs">
              <button type="button" className={!isSignup ? 'active' : ''} onClick={() => changeAuthMode(false)}>Login</button>
              <button type="button" className={isSignup ? 'active' : ''} onClick={() => changeAuthMode(true)}>Sign up</button>
            </div>

            <label htmlFor="auth-email">Email address</label>
            <input id="auth-email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => { setEmail(e.target.value); setAuthError('') }} required />

            <label htmlFor="auth-password">Password</label>
            <input id="auth-password" type="password" autoComplete={isSignup ? 'new-password' : 'current-password'} placeholder="At least 8 characters" value={password} onChange={(e) => { setPassword(e.target.value); setAuthError('') }} required />
            <small className="password-hint">8+ characters with uppercase, lowercase, number and special symbol.</small>

            {isSignup && <>
              <label htmlFor="auth-confirm">Confirm password</label>
              <input id="auth-confirm" type="password" autoComplete="new-password" placeholder="Enter password again" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setAuthError('') }} required />
            </>}

            <label htmlFor="auth-role">Login as</label>
            <select id="auth-role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option>Student</option>
              <option>Administrator</option>
              <option>Recruiter</option>
            </select>

            {authError && <p className="auth-error" role="alert">{authError}</p>}
            <button className="auth-submit" type="submit">{isSignup ? 'Create Account →' : 'Login →'}</button>
            <p className="auth-switch">{isSignup ? 'Already have an account?' : 'New to Campus Connect?'} <button type="button" onClick={() => changeAuthMode(!isSignup)}>{isSignup ? 'Login' : 'Sign up free'}</button></p>
            <small className="auth-note">Frontend demo only. Accounts and role permissions are not stored or verified.</small>
          </form>
        </section>
      </div>
    )
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <a className="brand" href="#home"><span className="brand-icon">CC</span><span>Campus Connect</span></a>
        <a className="post-button" href="#business">＋ Post an Opportunity</a>
        <p className="nav-heading">EXPLORE</p>
        <nav className="side-nav">
          {categories.map((item) => (
            <button key={item.name} className={(item.name === 'Home' && activeTab === 'All') || item.name === activeTab ? 'nav-item selected' : 'nav-item'} onClick={() => {
              if (item.name === 'Home') { setActiveTab('All'); setSearch(''); window.scrollTo({ top: 0, behavior: 'smooth' }) }
              else { setActiveTab(item.name); document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' }) }
            }}><span>{item.icon}</span>{item.name}</button>
          ))}
        </nav>
        <div className="sidebar-promo"><strong>💼 Post a Job or Internship</strong><small>Help students discover opportunities.</small></div>
        <div className="sidebar-promo purple"><strong>🎓 Become a Mentor</strong><small>Share your experience with students.</small></div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="mobile-brand"><span className="brand-icon">CC</span> Campus Connect</div>
          <div className="search-box">
            <span>⌕</span>
            <input type="search" aria-label="Search opportunities" placeholder="Search internships, jobs, companies, skills..." value={search} onChange={(e) => setSearch(e.target.value)} />
            {search && <button type="button" className="clear-search" aria-label="Clear search" onClick={() => setSearch('')}>×</button>}
          </div>
          <div className="header-actions">
            <a className="business-button" href="#business">▣ For Business</a>
            <button className="logout-button" onClick={logOut}>⇥ Log out</button>
          </div>
        </header>

        <section className="hero" id="home">
          <div>
            <span className="eyebrow">YOUR NEXT STEP STARTS HERE</span>
            <h1>Unlock Your <span>Career!</span></h1>
            <p>Explore internships, jobs, competitions and hackathons. Find something that matches your interests and take your next step.</p>
            <a className="primary-button" href="#categories">Explore Opportunities →</a>
            <small className="hero-note">✦ Learn new skills &nbsp; ✦ Discover opportunities</small>
          </div>
          <div className="hero-art"><span>CC</span><div><strong>Discover something new</strong><small>Your next opportunity awaits.</small></div></div>
        </section>

        <section className="content-section" id="categories">
          <span className="eyebrow">EXPLORE YOUR OPTIONS</span>
          <h2>Find your next opportunity</h2>
          <div className="category-grid">
            {[
              { name: 'Internships', icon: '💼', text: 'Get experience', color: 'blue' },
              { name: 'Jobs', icon: '🧳', text: 'Start your career', color: 'purple' },
              { name: 'Competitions', icon: '🏆', text: 'Show your skills', color: 'yellow' },
              { name: 'Mock Tests', icon: '📝', text: 'Practise for tests', color: 'pink' },
              { name: 'Hackathons', icon: '💻', text: 'Build something', color: 'blue' },
              { name: 'Mentorship', icon: '🎓', text: 'Learn from others', color: 'purple' },
            ].map((item) => <button key={item.name} className={`category-card ${item.color}`} onClick={() => { setActiveTab(item.name === 'Hackathons' ? 'Hackathons' : item.name); document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' }) }}><strong>{item.name}</strong><span>{item.icon}</span><small>{item.text}</small><b>Explore →</b></button>)}
          </div>
        </section>

        <section className="content-section" id="opportunities">
          <div className="section-title-row"><div><span className="eyebrow">HANDPICKED FOR STUDENTS</span><h2>Featured Opportunities</h2><p>Find a project, role or challenge to explore.</p></div><button className="view-all" onClick={() => { setActiveTab('All'); setSearch('') }}>View all ↻</button></div>
          <div className="filters">
            {['All', 'Internships', 'Jobs', 'Competitions', 'Hackathons', 'Mentorship', 'Mock Tests'].map((tab) => <button key={tab} className={activeTab === tab ? 'filter active' : 'filter'} onClick={() => setActiveTab(tab)}>{tab}</button>)}
          </div>
          <div className="opportunity-grid">
            {filteredOpportunities.map((item) => <article className="opportunity-card" key={item.id}>
              <div className="card-top"><span className="company-initial">{item.company.charAt(0)}</span><span className="type-label">{item.type}</span></div>
              <p className="company-name">{item.company}</p><h3>{item.title}</h3><p className="location">⌖ {item.location}</p>
              <div className="tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <button className="details-button" onClick={() => setSelectedItem(item)}>View Details →</button>
            </article>)}
            {filteredOpportunities.length === 0 && <div className="no-results"><strong>No matching opportunities found.</strong><p>Try another keyword or category.</p><button className="details-button" onClick={() => { setSearch(''); setActiveTab('All') }}>Clear search and filters</button></div>}
          </div>
          <small className="demo-note">Sample listings for this student project; these are not verified live vacancies.</small>
        </section>

        <section className="content-section partners" id="partners">
          <span className="eyebrow">COMPANIES TO EXPLORE</span><h2>Our Trusted Partners</h2><p>Explore these companies and learn more about their work.</p>
          <div className="partner-row">
            <a href="https://www.wipro.com/" target="_blank" rel="noreferrer"><img src="https://cdn.simpleicons.org/wipro" alt="Wipro" /><b>Wipro ↗</b></a>
            <a href="https://www.infosys.com/" target="_blank" rel="noreferrer"><img src="https://cdn.simpleicons.org/infosys" alt="Infosys" /><b>Infosys ↗</b></a>
            <a href="https://www.tata.com/" target="_blank" rel="noreferrer"><img src="https://cdn.simpleicons.org/tata" alt="Tata" /><b>Tata ↗</b></a>
            <a href="https://www.microsoft.com/" target="_blank" rel="noreferrer"><img src="https://cdn.simpleicons.org/microsoft" alt="Microsoft" /><b>Microsoft ↗</b></a>
          </div>
          <small className="demo-note">Company links only; these are not official partnerships.</small>
        </section>

        <section className="business-panel" id="business"><div><span className="eyebrow">FOR BUSINESSES & ORGANISERS</span><h2>Have an opportunity to share?</h2><p>Contact us to discuss sharing a job, internship or event with students.</p></div><a className="primary-button" href="mailto:campusconnect@example.com?subject=Campus%20Connect%20opportunity">Contact Us ↗</a></section>

        <footer className="site-footer">
          <div className="footer-main">
            <div><a className="brand" href="#home"><span className="brand-icon">CC</span> Campus Connect</a><p className="footer-copy">Connecting students with opportunities, skills and new possibilities.</p><div className="socials"><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">in</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">◎</a><a href="https://www.youtube.com/" target="_blank" rel="noreferrer">▶</a></div></div>
            <div className="footer-column"><h3>Explore</h3><a href="#categories">Internships</a><a href="#opportunities">Jobs</a><a href="#opportunities">Competitions</a><a href="#opportunities">Hackathons</a><a href="#opportunities">Mentorship</a></div>
            <div className="footer-column"><h3>For Students</h3><a href="#opportunities">Featured opportunities</a><a href="#partners">Trusted companies</a><a href="#categories">Explore categories</a><button onClick={logOut}>Switch account</button></div>
            <div className="footer-column"><h3>For Business</h3><p>Want to share an opportunity with students?</p><a href="#business">Post an opportunity ↗</a><a href="mailto:campusconnect@example.com">Contact us ↗</a></div>
          </div>
          <div className="footer-locations"><h3>Jobs by Location</h3><div>{['Patiala', 'Chandigarh', 'Delhi', 'Pune', 'Bangalore', 'Hyderabad'].map((city) => <a key={city} href={`https://www.google.com/search?q=${encodeURIComponent(`jobs in ${city}`)}`} target="_blank" rel="noreferrer">Jobs in {city} ↗</a>)}</div></div>
          <div className="footer-bottom"><span>© 2026 Campus Connect · Front End Engineering-II student project</span><a href="#home">Back to top ↑</a></div>
        </footer>
      </main>

      {selectedItem && <div className="modal-backdrop" onClick={() => setSelectedItem(null)}><div className="details-modal" role="dialog" aria-modal="true" aria-label="Opportunity details" onClick={(e) => e.stopPropagation()}><button className="modal-close" aria-label="Close" onClick={() => setSelectedItem(null)}>×</button><span className="type-label">{selectedItem.type}</span><h2>{selectedItem.title}</h2><p className="company-name">{selectedItem.company}</p><p className="location">⌖ {selectedItem.location}</p><p>{selectedItem.description}</p><div className="tags">{selectedItem.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><small className="demo-note">This is a sample listing. Applications are not connected yet.</small><button className="primary-button" onClick={() => setSelectedItem(null)}>Close Details</button></div></div>}
    </div>
  )
}

export default App
