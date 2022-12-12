import {
    Button,
    Divider,
    List,
    Modal,
    Paper,
    TextField,
    Typography,
} from '@mui/material'
import {
    getAllCoupons,
    getDiscountForJumbo,
} from 'components/MenuList/store/menulist.actions'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserInfo from './UserInfo'

function CartItems(props) {
    const cart_count = useSelector((state) => state.menuItems.cart_count)
    const menu_items = useSelector((state) => state.menuItems.selectedMenuItems)
    const coupons = useSelector((state) => state.menuItems.coupons)
    const [total_price, setTotalPrice] = useState(0)
    const [coupon_code, setCouponCode] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        const allItemsPrice = []
        menu_items.map((item) => allItemsPrice.push(parseFloat(item.price)))
        let totalPrice = allItemsPrice.reduce((a, b) => a + b, 0)
        totalPrice = parseFloat(totalPrice).toFixed(2)
        setTotalPrice(totalPrice)
    }, [menu_items])

    useEffect(() => {
        dispatch(getAllCoupons())
    }, [dispatch])

    const ValidateCoupon = () => {
        if (coupon_code === 'DECEOK') {
            const date = new Date()
            let month = date.getMonth() + 1
            let finalprice = (total_price - 2.33).toFixed(2)
            if (month === 12) {
                setTotalPrice(finalprice)
            } else {
                setErrMsg('Coupon code not Valid')
            }
        } else if (coupon_code.startsWith('ACT')) {
            let finalprice = (total_price - 2.12).toFixed(2)
            setTotalPrice(finalprice)
        } else if (coupon_code === 'JUMBO') {
            let discounted_amt = 0
            dispatch(getDiscountForJumbo({ code: 'JUMBO', menu_items })).then(
                (res) => {
                    discounted_amt = res.payload + 4.23
                    let finalprice = total_price - discounted_amt
                    setTotalPrice(finalprice.toFixed(2))
                }
            )
        }
    }


    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper
                    style={{ maxHeight: 400, overflow: 'auto' }}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '500px',
                        transform: 'translate(-50%,-50%)',
                    }}
                >
                    {cart_count !== 0 &&
                        menu_items.map((item) => {
                            return (
                                <>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                p: 1,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                        <div>
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    color: 'black',
                                                    border: '1px solid grey',
                                                    m: 2,
                                                    p: 0,
                                                    fontSize: '20px',
                                                    minWidth: '35px',
                                                    lineHeight: 1.2,
                                                }}
                                            >
                                                +
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    color: 'black',
                                                    border: '1px solid grey',
                                                    m: 2,
                                                    p: 0,
                                                    fontSize: '20px',
                                                    minWidth: '35px',
                                                    lineHeight: 1.2,
                                                }}
                                            >
                                                -
                                            </Button>
                                        </div>
                                    </div>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{ pl: 1, color: 'red' }}
                                    >
                                        {'$' + item.price}
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                color: 'black',
                                                border: '1px solid grey',
                                                m: 1,
                                                p: 0.7,
                                                fontSize: '12px',
                                                minWidth: '35px',
                                                lineHeight: 1.2,
                                            }}
                                        >
                                            {'X ' + item.quantity}
                                        </Button>
                                    </Typography>

                                    <Divider />
                                </>
                            )
                        })}

                    <Typography
                        variant="subtitle1"
                        sx={{
                            p: 1,
                            fontWeight: 'bold',
                        }}
                    >
                        Total Price {'$ ' + total_price}
                    </Typography>
                    <Divider />
                    <TextField
                        style={{
                            width: '200px',
                            margin: '5px',
                            marginTop: '10px',
                        }}
                        type="text"
                        label="Enter Coupon Code"
                        variant="outlined"
                        id="outlined-basic"
                        color="secondary"
                        inputProps={{
                            maxLength: 6,
                        }}
                        onBlur={(e) => setCouponCode(e.target.value)}
                    />
                    {errMsg !== '' ? <h6>{errMsg}</h6> : ''}
                    <Button
                        variant="contained"
                        sx={{
                            ml: 5,
                            mt: 1,
                            borderRadius: '20px',
                            backgroundColor: '#192841',
                            color: 'white',
                        }}
                        onClick={() => ValidateCoupon()}
                    >
                        Validate Coupon
                    </Button>
                    <UserInfo finalprice={total_price}/>
                </Paper>
            </Modal>
        </div>
    )
}

export default CartItems
