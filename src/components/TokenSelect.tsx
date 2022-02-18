
import { Input, Modal } from 'antd'
import React, { useState } from 'react'
import './Donate.less'


type TokenSelectProps = {
    selectedAsset: any,
    tokenList: any[],
    onAssetSelected: any,
}

const TokenSelect: React.FC<TokenSelectProps> = ({selectedAsset, tokenList, onAssetSelected}) => {
    const [visible, setVisible] = useState(false)
    const handleAssetSelect = (asset: any) => {
        setVisible(false);
        onAssetSelected && onAssetSelected(asset);
    }
    return (
        <>
            <div onClick={() => setVisible(true)} className="bg-[#f3f5f3] cursor-pointer justify-between text-[14px] font-bold items-center flex px-[10px] w-full h-[48px] rounded-[10px]">
                <span className="flex items-center">
                    <img src={selectedAsset.logo} className="w-[30px] h-[30px] rounded-full  mr-[5px]" />
                    {selectedAsset.symbol}
                </span>
                <span>
                    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.66772 0.576506C10.055 0.956182 10.055 1.57176 9.66772 1.95144L5.70105 5.84032C5.31378 6.22 4.68589 6.22 4.29862 5.84032L0.331957 1.95144C-0.0553137 1.57176 -0.0553136 0.956182 0.331957 0.576505C0.719227 0.196829 1.34711 0.196829 1.73438 0.576505L4.99984 3.77793L8.26529 0.576506C8.65256 0.196829 9.28045 0.196829 9.66772 0.576506Z" fill="#8E8E93" />
                    </svg>
                </span>
            </div>

            <Modal onCancel={() => setVisible(false)} visible={visible} className="modal-theme2" width="386px" title="CAT List" footer={false}>
                {/* <div className="mt-[-20px] mb-[20px]">
                    <Input size="large" />
                </div> */}

                <ul>
                    {tokenList.map(item =>
                        <li key={item.assetId}
                            onClick={() => handleAssetSelect(item)}
                            className="cursor-pointer hover:opacity-80 flex mb-[20px] items-center justify-between">
                            <span className="flex items-center">
                                <img src={item.logo} className="w-[30px] h-[30px] rounded-full  mr-[10px]" />
                                {item.symbol}
                            </span>
                        </li>
                    )}
                </ul>
            </Modal>
        </>
    )
}

export default TokenSelect
