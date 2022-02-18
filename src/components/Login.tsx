import { Button, Modal, ModalProps } from "antd";
import React from "react";
import "./Donate.less";

interface Props extends ModalProps {
  onSuccess: () => void;
}

const Login: React.FC<Props> = (props) => {
  return (
    <Modal
      className="modal-theme"
      width="386px"
      closable={false}
      footer={false}
      {...props}
    >
      <div className="text-center">
        <svg
          className="m-auto mt-[20px] mb-[38px]"
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="100" fill="#848484" fillOpacity="0.1" />
          <path
            d="M119.209 46.2672C119.209 45.015 118.194 44 116.942 44C115.691 44 114.676 45.015 114.676 46.2672V58.3588C114.676 59.6109 115.691 60.626 116.942 60.626C118.194 60.626 119.209 59.6109 119.209 58.3588V46.2672Z"
            fill="#96C93D"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M128.442 88.1297L128.441 103.887H132.421C132.924 103.887 133.406 104.087 133.762 104.444C134.117 104.8 134.317 105.283 134.317 105.787V127.336C134.317 127.84 134.117 128.323 133.762 128.679C133.406 129.035 132.924 129.234 132.421 129.234H128.441V133.507C128.441 136.025 127.443 138.439 125.666 140.22C123.889 141.999 121.478 143 118.965 143H64.4763C61.9631 143 59.553 141.999 57.7755 140.22C55.9988 138.439 55 136.025 55 133.507V88.1298C55 85.6114 55.9987 83.1971 57.7755 81.4165C59.553 79.6366 61.9631 78.6367 64.4763 78.6367L67.6988 78.636L68.8357 75.6933C69.3798 74.2087 70.516 73.018 71.9722 72.4055C73.4277 71.7936 75.0723 71.8155 76.5113 72.4658L90.4415 78.6366H118.965C121.478 78.6366 123.889 79.6364 125.666 81.4164C127.443 83.197 128.442 85.6115 128.442 88.1297ZM122.986 84.1017C121.919 83.0336 120.473 82.4337 118.965 82.4337L99.0651 82.4337L116.028 90.0283H118.965C121.017 90.021 123.014 90.6878 124.651 91.9268V88.1299C124.651 86.6188 124.052 85.1698 122.986 84.1017ZM73.4909 75.9462C73.0063 76.1436 72.6249 76.5336 72.4365 77.0223L67.6038 90.0283H106.836L74.9953 75.978C74.5201 75.7601 73.9754 75.7482 73.4909 75.9462ZM66.2773 82.4337H64.4766C62.9523 82.4337 61.4914 83.0469 60.4225 84.1355C59.353 85.2242 58.7654 86.6975 58.7912 88.2245V92.0214C60.1383 90.9785 61.7433 90.3223 63.4342 90.1229L66.2773 82.4337ZM112.711 125.438H130.621V107.686H112.711C111.665 107.686 110.816 108.535 110.816 109.584V123.539C110.816 124.587 111.665 125.438 112.711 125.438ZM112.711 103.888H124.652V99.5216C124.652 98.0105 124.053 96.5622 122.986 95.4941C121.92 94.4253 120.473 93.8254 118.966 93.8254H64.4768C62.9691 93.8254 61.5227 94.4253 60.4565 95.4941C59.3903 96.5623 58.7914 98.0105 58.7914 99.5216V133.602C58.7914 135.112 59.3903 136.561 60.4565 137.629C61.5227 138.697 62.969 139.298 64.4768 139.298H118.966C120.473 139.298 121.92 138.697 122.986 137.629C124.053 136.561 124.652 135.112 124.652 133.602V129.235H112.711C111.203 129.235 109.757 128.635 108.691 127.567C107.625 126.498 107.026 125.05 107.026 123.539V109.584C107.026 108.074 107.625 106.625 108.691 105.557C109.757 104.489 111.203 103.888 112.711 103.888Z"
            fill="#96C93D"
          />
          <path
            d="M148.761 53.7327C149.646 54.6181 149.646 56.0536 148.761 56.939L140.214 65.489C139.329 66.3744 137.895 66.3744 137.01 65.489C136.125 64.6037 136.125 63.1682 137.01 62.2828L145.556 53.7327C146.441 52.8473 147.876 52.8473 148.761 53.7327Z"
            fill="#96C93D"
          />
          <path
            d="M157.734 87.0763C158.985 87.0763 160 86.0613 160 84.8092C160 83.557 158.985 82.542 157.734 82.542H145.647C144.396 82.542 143.381 83.557 143.381 84.8092C143.381 86.0613 144.396 87.0763 145.647 87.0763H157.734Z"
            fill="#96C93D"
          />
        </svg>

        <p className="mb-[15px]">You haven’t installed any browser wallet</p>
        <div>
          <Button
            type="primary"
            size="large"
            className="btn-theme-color px-[35px] mb-[5px]"
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://chrome.google.com/webstore/detail/goby/jnkelfanjkeadonecabehalmbgpfodjm"
            >
              Try Goby →
            </a>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
