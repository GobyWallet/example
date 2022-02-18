import { Button, Popover } from 'antd'
import { useEffect, useState } from 'react';
import { getBalanceByAddress } from '../api';
import { toChainAddress, toDecimalAmount } from '../chia-util';

const UserInfo = ({account}: {account: string}) => {
    const chainAddress = toChainAddress(account);
    const [balance, setBalance] = useState<number|null>(null);

    useEffect(() => {
       (async () => {
        const amount = await getBalanceByAddress(chainAddress);
        setBalance(amount);
       })();
    }, [chainAddress]);
    const content = <div className="w-[318px] h-[40px]">
        <span className="break-all font-bold text-[14px]">{chainAddress}</span>
    </div>

    return (
        <Popover placement="bottom" overlayClassName="popover-theme" content={content}>
            <div className="bg-white p-[4px] min-w-[236px] h-[44px] flex items-center rounded-[100px]">
                <span className="font-bold text-right pr-[10px] pl-[10px] flex-1">{balance == null? "-" : toDecimalAmount(balance)} XCH</span>
                <span className="flex font-bold ml-auto bg-[#effdf0] h-full items-center px-[8px] pl-[12px] py-[8px] rounded-full">
                    <span className="mr-[5px]">{`${chainAddress.slice(0, 6)}...${chainAddress.slice(-4)}`}</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.30549 4.57951C9.3247 4.57951 10.2799 4.9616 11.0126 5.69425L12.6049 7.28657C13.1145 7.79617 13.9106 7.79617 14.4202 7.28657C14.9298 6.77698 14.9298 5.98081 14.4202 5.47121L12.8597 3.87889C11.6495 2.66866 10.0572 2 8.3693 2C6.68144 2 5.05738 2.66889 3.87889 3.87889C2.66866 5.08911 2 6.68143 2 8.3693C2 10.0572 2.66889 11.6812 3.87889 12.8597L5.43942 14.452C5.69422 14.7068 6.01255 14.8341 6.33112 14.8341C6.6497 14.8341 6.968 14.7068 7.22283 14.452C7.73242 13.9424 7.73242 13.1463 7.22283 12.6367L5.6305 11.0443C4.89809 10.3119 4.51576 9.35648 4.51576 8.33728C4.51576 7.31808 4.89785 6.36286 5.6305 5.63022C6.33112 4.96155 7.28652 4.57951 8.30549 4.57951Z" fill="#96C93D" />
                        <path d="M18.4327 9.51572C17.9231 9.00612 17.1269 9.00612 16.6173 9.51572C16.1077 10.0253 16.1077 10.8215 16.6173 11.3311L18.1779 12.8916C18.9103 13.624 19.2926 14.5795 19.2926 15.5987C19.2926 16.6179 18.9105 17.5731 18.1779 18.3057C17.4454 19.0382 16.49 19.4205 15.4708 19.4205C14.4516 19.4205 13.4964 19.0384 12.7637 18.3057L11.1714 16.7452C10.6618 16.2356 9.86563 16.2356 9.35603 16.7452C8.84643 17.2548 8.84643 18.051 9.35603 18.5606L10.9166 20.1211C12.1268 21.3313 13.7191 22 15.407 22C17.0948 22 18.7189 21.3311 19.8974 20.1211C21.1076 18.9109 21.7763 17.3186 21.7763 15.6307C21.7763 13.9428 21.1074 12.3188 19.8974 11.1403L18.4327 9.51572Z" fill="#96C93D" />
                        <path d="M14.834 14.9297C14.5792 15.1845 14.2609 15.3118 13.9423 15.3118C13.592 15.3118 13.2735 15.1845 13.0187 14.9299L8.9741 10.8854C8.4645 10.3758 8.4645 9.57959 8.9741 9.06999C9.4837 8.5604 10.2799 8.5604 10.7895 9.06999L14.834 13.1143C15.3436 13.6239 15.3436 14.4201 14.834 14.9297Z" fill="#96C93D" />
                    </svg>
                </span>
            </div>
        </Popover>
    )
}

export default UserInfo
