import {deleteCookie, getCookie, setCookie} from "cookies-next";
import {createBasket, getAllBasketItem, getBasketByToken} from "@/api/basketApi";
import {SET_BASKET_ITEMS_LIST} from "@/store/reducers/basketReducer/basketItemReducerActions";
import {CATALOG} from "@/utils/routes";

export const add_notification = (head, text, type, addNotification) => {
    const id = Date.now()
    addNotification({
        id,
        head,
        text,
        type,
    })
}

export const checkBasketToken = async ({ req, res }, dispatch) => {
    let token = getCookie( 'token',{ req, res } )

    const random = Math.floor(Math.random() * 30)
    const tk = Date.now().toString().split('').reverse().join('') + random

    let basketItems = []
    if (token && Number(token)) {
        token = token.toString()
        const basket = await getBasketByToken(token)
        if (basket) {
            basketItems = await getAllBasketItem(token)
        } else {
            deleteCookie('token', { req, res })
            setCookie('token', tk, { req, res })
            await createBasket(tk)
        }
    } else {
        setCookie('token', tk, { req, res })
        await createBasket(tk)
    }

    dispatch({type: SET_BASKET_ITEMS_LIST, payload: basketItems})
    return basketItems
}

export const routerPushCatalogQueryParams = async (router, page, max, min, genreIds, finder) => {
    await router.push({
        pathname: CATALOG,
        query: { page: page, max: max, min: min, gIds: genreIds, finder: finder}
    })
}