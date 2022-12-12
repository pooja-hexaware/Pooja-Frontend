import React from 'react'
import { Box, Card, CardContent, Paper, Typography } from '@mui/material'
import MenuList from 'components/MenuList/MenuList'

const Home = () => {
    const myStyle = {
        backgroundImage: "url('/mainBg.jpg')",
        height: '100vh',
        fontSize: '50px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
    }
   
    return (
        <div style={myStyle}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '5px',
                }}
            >
                <Card
                    sx={{
                        maxWidth: 500,
                        backgroundColor: '#3b80ad',
                        color: 'white',
                        alignItems: 'center',
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Good Food , Great Time
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Our Chefs at WiWi make delicious food selections
                            every week- you pick, we cook and deliver
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <MenuList></MenuList>
        </div>
    )
}

export default Home
