import styled from "styled-components";
import { ChevronDown, ChevronUp } from "../constants/icons";
import useStore from "../store/store"; // Zustand

const CartItem = ({ id, title, singer, price, img, amount }) => {
    const { increase, decrease, removeItem } = useStore();

    return (
        <StyledCartItem>
            <img src={img} alt={`${title} 이미지`} />
            <div className="cart-info">
                <h4 className="cart-title">
                    {title} | {singer}
                </h4>
                <h4 className="cart-price">\ {price}</h4>
            </div>
            <div className="cart-actions">
                <button className="cart-amount-btn" onClick={() => increase(id)}>
                    <ChevronUp />
                </button>
                <p className="cart-amount">{amount}</p>
                <button
                    className="cart-amount-btn"
                    onClick={() => {
                        if (amount === 1) {
                            removeItem(id);
                            return;
                        }
                        decrease(id);
                    }}
                >
                    <ChevronDown />
                </button>
            </div>
        </StyledCartItem>
    );
};

export default CartItem;

const StyledCartItem = styled.article`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #ddd;

    img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .cart-info {
        flex: 1;
        margin-left: 16px;

        .cart-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 8px;
            color: #333;
        }

        .cart-price {
            color: #666;
            font-size: 14px;
        }
    }

    .cart-actions {
        display: flex;
        flex-direction: column;
        align-items: center;

        .cart-amount-btn {
            background-color: #f9f9f9;
            color: #555;
            border: 1px solid #ccc;
            border-radius: 4px;
            cursor: pointer;
            padding: 8px;
            margin: 4px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s ease;

            svg {
                width: 16px;
                height: 16px;
            }
        }

        .cart-amount-btn:hover {
            background-color: #eee;
        }

        .cart-amount {
            font-size: 16px;
            font-weight: bold;
            color: #444;
        }
    }
`;
