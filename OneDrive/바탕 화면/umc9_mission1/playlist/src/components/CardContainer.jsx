import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { clearCart } from "../features/cart/cartSlice";

const CartContainer = () => {
    //const state = useSelector((store) => store.cart);
    //console.log(state);
    const { cartItems, total, amount }= useSelector((store) => store.cart);
    const dispatch = useDispatch();
    return (
        <Cart>
            <header>
                <h2>당신이 선택한 음반</h2>
            </header>
            <div>
                {cartItems.map((item) => {
                    return <CartItem key = {item.id} {...item} />
                })}
            </div>
            <footer>
                <hr />
                <div className="cart-total">
                    <h4>총 가격</h4>
                    <span>\ {total}원</span>
                </div>
                <button className="btn clear-btn" onClick={() => {
                    dispatch(clearCart());
                }} >
                    장바구니 초기화
                </button>
            </footer>
        </Cart>
    );
};

export default CartContainer;

const Cart = styled.section`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;

    header {
        text-align: center;
        margin-bottom: 20px;
        h2 {
            font-size: 24px;
            font-weight: bold;
        }
    }

    .cart-items {
        margin-bottom: 20px;
    }

    footer {
        text-align: center;
        hr {
            margin: 20px 0;
            border: 0;
            height: 1px;
            background: #ccc;
        }

        .cart-total {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;

            h4 {
                font-size: 18px;
                font-weight: bold;
                margin: 0;
            }

            span {
                font-size: 18px;
                font-weight: bold;
                color: #333;
            }     
        }

        .clear-btn {
            background: #e91e63; /* 분홍색 */
            color: white;
            border: none;
            padding: 12px 24px; /* 패딩을 조금 더 크게 */
            font-size: 18px; /* 폰트 크기 증가 */
            font-weight: bold;
            border-radius: 8px; /* 둥근 모서리 */
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease; /* 배경색 변화와 크기 변화 추가 */

            &:hover {
                background: #d81b60; /* 마우스를 올렸을 때 더 어두운 분홍색 */
                transform: scale(1.05); /* 마우스를 올렸을 때 살짝 커지는 효과 */
            }

            &:active {
                background: #c2185b; /* 클릭 시 더 어두운 분홍색 */
                transform: scale(1); /* 클릭 후 크기 초기화 */
            }
        }
    }
`;