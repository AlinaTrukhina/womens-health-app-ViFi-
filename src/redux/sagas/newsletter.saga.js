import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchNewsletter() {
    try {
        let res = yield axios.get('/api/');

        yield put({ type:'SET_', payload: res.data });
    } catch (err) {
        console.log('Unable to fetch ___ from table', err);
    }
}

function* addToNewsletter(action) {
    console.log('IN NEWSLETTER SAGA');
    try {
        yield axios.post('/api/newsletter', {email: action.payload});
    } catch (err) {
        console.log('Unable to add newsletter from table', err);
    }
}

export default function* newsletterSaga() {
    yield takeLatest('FETCH_NEWSLETTER', fetchNewsletter);
    yield takeLatest('ADD_TO_NEWSLETTER', addToNewsletter);
}