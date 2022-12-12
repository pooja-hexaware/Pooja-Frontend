import React, { useState } from 'react'
import useAuth from 'common/hooks/useAuth'
import useSettings from 'common/hooks/useSettings'
import { styled, useTheme, Box } from '@mui/system'
import { themeShadows } from 'components/MatxTheme/themeColors'
import {
    useMediaQuery,
    Hidden,
    Typography,
    Chip,
    Button,
} from '@mui/material'
import { topBarHeight } from 'utils/constant'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useSelector } from 'react-redux'
import CartItems from 'components/CartItems/CartItems'
const TopbarRoot = styled('div')(({ theme }) => ({
    top: 0,
    zIndex: 96,
    transition: 'all 0.3s ease',
    boxShadow: themeShadows[8],
    height: topBarHeight,
}))

const TopbarContainer = styled(Box)(({ theme }) => ({
    padding: '8px',
    paddingLeft: 18,
    paddingRight: 20,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    [theme.breakpoints.down('xs')]: {
        paddingLeft: 14,
        paddingRight: 16,
    },
}))

const Layout1Topbar = () => {
    const theme = useTheme()
    
    const cart_count = useSelector((state) => state.menuItems.cart_count)
        const [showCart, setShowCart] = useState(false)

    
    return (
        <TopbarRoot>
            <TopbarContainer
                sx={{ backgroundColor: '#3b80ad', color: 'white' }}
            >
                <Box display="flex">
                    <Typography variant="h6">
                        WiWi Food App (Capestone)
                    </Typography>
                </Box>

                <Button
                    sx={{
                        background: '#192841',
                        color: 'white',
                        p: '1.3,2,1.3,2',
                        border: 'none',
                        borderRadius: '50px',
                        marginLeft:'60%'
                    }}
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    endIcon={
                        <Chip
                            label={cart_count}
                            variant="outlined"
                            sx={{ color: 'white' }}
                        />
                    }
                    onClick={()=>setShowCart(!showCart)}
                >
                    Your Cart
                </Button>
                <CartItems open={showCart} close={()=>setShowCart(!showCart)} />

            </TopbarContainer>
        </TopbarRoot>
    )
}

export default React.memo(Layout1Topbar)
