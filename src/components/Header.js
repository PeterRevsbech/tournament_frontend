import Button from './Button'


const Header = ({ title , onAdd, showAddButton}) => {
    
    return (
        <header className='header'>
            <h1> {title} </h1>
            <Button color={showAddButton ? 'green' : 'red'} text={showAddButton ? 'Add' : 'Hide'}
                onClick={onAdd}
            /> 
           
           
        </header>
    )
}

Header.defaultProps = {
    title: 'Tournaments',
}

export default Header