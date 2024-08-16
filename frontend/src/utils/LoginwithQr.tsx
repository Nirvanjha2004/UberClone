function GoogleSigninButton() {
  return (
    <div>
      <button
        aria-label="Sign in with Google"
        className="flex items-center pr-[82px] pl-[82px] bg-white border border-button-border-light rounded-md p-0.5 "
      >
        <div className="flex items-center justify-center bg-white w-5 h-5 m-2 rounded-l">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 100 100"
            xml:space="preserve"
            width="100px"
            height="100px"
          >
            <rect x="0" y="0" width="20" height="20" fill="#000000" />
            <rect x="30" y="0" width="20" height="20" fill="#000000" />
            <rect x="60" y="0" width="20" height="20" fill="#000000" />
            <rect x="0" y="30" width="20" height="20" fill="#000000" />
            <rect x="30" y="30" width="20" height="20" fill="#000000" />
            <rect x="60" y="30" width="20" height="20" fill="#000000" />
            <rect x="0" y="60" width="20" height="20" fill="#000000" />
            <rect x="30" y="60" width="20" height="20" fill="#000000" />
            <rect x="60" y="60" width="20" height="20" fill="#000000" />
            <rect x="90" y="0" width="10" height="10" fill="#000000" />
            <rect x="90" y="20" width="10" height="10" fill="#000000" />
            <rect x="80" y="10" width="10" height="10" fill="#000000" />
            <rect x="70" y="10" width="10" height="10" fill="#000000" />
            <rect x="50" y="10" width="10" height="10" fill="#000000" />
            <rect x="90" y="40" width="10" height="10" fill="#000000" />
            <rect x="80" y="40" width="10" height="10" fill="#000000" />
            <rect x="60" y="40" width="10" height="10" fill="#000000" />
            <rect x="40" y="40" width="10" height="10" fill="#000000" />
            <rect x="20" y="40" width="10" height="10" fill="#000000" />
            <rect x="90" y="80" width="10" height="10" fill="#000000" />
            <rect x="80" y="90" width="10" height="10" fill="#000000" />
            <rect x="60" y="90" width="10" height="10" fill="#000000" />
            <rect x="40" y="90" width="10" height="10" fill="#000000" />
            <rect x="20" y="90" width="10" height="10" fill="#000000" />
            <rect x="0" y="90" width="10" height="10" fill="#000000" />
            <rect x="10" y="90" width="10" height="10" fill="#000000" />
            <rect x="90" y="60" width="10" height="10" fill="#000000" />
            <rect x="90" y="50" width="10" height="10" fill="#000000" />
            <rect x="10" y="50" width="10" height="10" fill="#000000" />
          </svg>
        </div>
        <span className="text-sm text-google-text-gray tracking-wider">
          Sign in with Google
        </span>
      </button>
    </div>
  );
}

export default GoogleSigninButton;
