export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  styles?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, styles }) => {
  console.log('children: ', children);
  console.log('styles: ', styles);
  
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 16px',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        ...styles,
      }}
    >
      {children}
    </button>
  );
};
