export const ENV = {
  production: false,
  isDebugMode: true,
  headers: { accept: 'application/json', 'Content-Type': 'application/json'},
  // API_BASE: 'https://devserverip:3000/',
  API_BASE: 'http://ec2-54-236-29-46.compute-1.amazonaws.com/',
  API_BASE_LOCAL: 'http://localhost:50785/',//'http://ec2-54-236-29-46.compute-1.amazonaws.com/',
  firebase: {
    apiKey: "AIzaSyB6kypyTRVF-5LJl_zaoQg2P-yiWjD-POo",
    authDomain: "jama-chat-dev.firebaseapp.com",
    databaseURL: "https://jama-chat-dev.firebaseio.com",
    projectId: "jama-chat-dev",
    storageBucket: "jama-chat-dev.appspot.com",
    messagingSenderId: "242397788854",
    users_colleaction: "users",
    chats_collection: "chats"
    },
  API_KEYS:{

    getSampleData: 'photos?albumId={:sampleParam}',
    getConfig: 'api/config',

    // activities
    getActivityDetails: 'api/activities/filter/event',
    getActivityReviews: 'api/activities/comments',
    getActivitiesByCategory: 'api/activities/filter/category',
    getActivitiesBySubCategory: 'api/activities/filter/category',
    getActivitiesByLocation: 'api/activities/filter/location',
    getActivitiesByCategories: 'api/activities/filter/self',
    getMyPastActivities: 'api/activities/filter/self/past',
    getMyFutureActivities: 'api/activities/filter/self/future',
    getMyInterestedActivities: 'api/activities/filter/self/interested',
    removePastActivity: 'api/activities/remove',
    getSearchActivities: 'api/search/activities',

    // users
    getConnectedUsers: 'api/users/friends',
    getUser:'api/users/user',
    getUserComments: 'api/users/comments',
    getUserActivities: 'api/users/activities',
    getSearchUsers: 'api/search/users',
    updateUserDetails: 'api/users/updateDetails',
    addActivityComment: 'api/users/addActivityComment',

    // suppliers
    getSupplierData: 'api/suppliers/supplier',
    getSupplierComments: 'api/suppliers/comments',
    getSupplierActivities: 'api/suppliers/activities',
    unregisterFromActivity: 'api/activities/cancel',
    getSearchSuppliers: 'api/search/suppliers',
  }
};
