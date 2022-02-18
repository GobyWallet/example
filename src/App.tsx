import { Button } from 'antd';
import { useEffect, useState } from 'react';
import './App.less';
import bgSvg from './assets/images/bg.svg';
import svg2 from './assets/images/img-10.svg';
import svg3 from './assets/images/img-3.svg';
import svg4 from './assets/images/img-4.svg';
import svg5 from './assets/images/img-5.svg';
import svg6 from './assets/images/img-6.svg';
import svg1 from './assets/images/img-7.svg';
import Donate from './components/Donate';
import Login from './components/Login';
import UserInfo from './components/UserInfo';

const links = [
  {
    icon: svg1,
    url: 'https://twitter.com/goby_app'
  },
  {
    icon: svg2,
    url: 'https://discord.gg/rZFf5dugft'
  },
  {
    icon: svg3,
    url: 'https://goby-app.medium.com/'
  },
  {
    icon: svg5,
    url: 'https://github.com/GobyWallet'
  },
  {
    icon: svg6,
    url: 'mailto:dimitry@goby.app'
  },
]

declare global {
  interface Window {
    chia: any;
  }
}

function App() {
  const [loginVisible, setLoginVisible] = useState(false)
  // const [user, setUser] = useState(false)
  const [account, setAccount] = useState<string|null>(null);

  const handleLogin = () => {
    setLoginVisible(false)
    // setUser(true)
  }
  const isGobyInstalled = () => {
    const { chia } = window;
    return Boolean(chia && chia.isGoby)
  }

  const init = async () => {
    if (isGobyInstalled()) {
      window.chia.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts?.[0]);
      })
      window.chia.on('chainChanged', () => window.location.reload());

      window.chia.request({method: 'accounts'}).then((accounts: string[]) => {
        setAccount(accounts?.[0]);
      })
    }
  }

  const handleConnect = async () => {
    if (isGobyInstalled()) {
      const accounts = await window.chia.request({method: 'requestAccounts'});
      setAccount(accounts?.[0]);
    } else {
      setLoginVisible(true);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="App flex flex-col bg-cover min-h-[100vh]" style={{
      background: `url(${bgSvg}) no-repeat 0 0`
    }}>
      <header className="flex-none py-[8px] container flex items-center justify-between">
        <a href="/" className="w-[105px] h-[35px]">
          <img src="/src/assets/images/logo.svg" alt="" />
        </a>

        {account ? <UserInfo account={account!} /> : <Button onClick={handleConnect} className="btn-theme-color" size="large" type="primary">
          Connect wallet
        </Button>}
      </header>

      <div className="flex-1 container">
        <Donate account={account} />
      </div>

      <footer className="flex-none bg-[#fbfbfb]">
        <div className="container flex h-[60px] justify-between items-center">
          <div>
            Goby App
            @2022
          </div>
          <div className="flex">
            {/* <span className="mr-[24px]">Brand assets</span>
            <span className="mr-[24px]">FAQ</span> */}
            <span className="text-[#cbccce]">|</span>
            <ul className="inline-flex ">
              {links.map((linkItem, index) =>
                <li key={index} className="ml-[24px] hover:opacity-70">
                  <a href={linkItem.url}><img src={linkItem.icon} alt="" /></a>
                </li>)
              }
            </ul>
          </div>
        </div>
      </footer>

      <Login onSuccess={handleLogin} visible={loginVisible} onCancel={() => setLoginVisible(false)} />
    </div>
  )
}


export default App
