import STRIPE_KEYS from './stripeKeys';


export function llamarApi() {
    fetch(`https://api.stripe.com/v1/products`, {
        headers: {
            Authorization: `Bearer ${STRIPE_KEYS.secret}`
        }
    })
    .then(resp => {
        console.log(resp);
        return resp.json();
    })    
    .then( respJson => console.log(respJson))
}
