import MuiToolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';

type Props = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Toolbar = ({onClick}:Props) => {
    return (
        <MuiToolbar>
            <IconButton color="inherit" aria-label="open drawer">
                <MenuIcon />
            </IconButton>
            <Box className='grow' />
            <Button onClick={onClick} className='action-btn' variant="contained" startIcon={<AddIcon />}>
                Create
            </Button>
        </MuiToolbar>
    )
}

export default Toolbar;