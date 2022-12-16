import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import healthCategories from './healthCategories';
import ageRanges from './agerange.reducer';
import specificResources from './specificresources.reducer';
import resourceToEdit from './resourcetoedit.reducer';
import categoryDetail from './categoryDetail.reducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  healthCategories, //renders health categories for a given age range (right now, renders the same categories for all age ranges)
  ageRanges, // age ranges from the DB table
  resourceToEdit, 
  specificResources, // age ranges from the DB table
  categoryDetail, //renders faqs for a specific health category
});

export default rootReducer;
