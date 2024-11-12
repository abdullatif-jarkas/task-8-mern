import './Popup.css'

interface PopupProps {
    message: string;
    children: React.ReactNode;
}
export default function Popup({ message, children }: PopupProps) {
    return (
        <div className='popup'>
            <p className='delete-message'>{message}</p>
            <div className='content'>
                {children}
            </div>
        </div>
    )
}
