import firebase from "firebase/app"

const socialMediaAuth = (prov) => {
    return firebase.auth().signInWithPopup(prov).then((res) => {
        return res;
    }).catch(er => {
        return er;
    })
};
export default socialMediaAuth;