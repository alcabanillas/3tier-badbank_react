export function Footer() {
  return (
    <div className="container-fluid">
      
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top bg-primary">
        
        <div className="col-md-6 d-flex center">
          <span className="text-white">Copyright © alcabanillas 2022</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="me-3">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/alvarocl76"
            >
              <i className="bi bi-twitter fs-4"></i>
            </a>
          </li>
          <li className="me-3">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/alcabanillas/"
            >
              <i className="bi bi-github fs-4"></i>
            </a>
          </li>
          <li className="me-3">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/alvarocl76/"
            >
              <i className="bi bi-linkedin fs-4"></i>
            </a>
          </li>
        </ul>
      </footer>
      </div>
  );
}
