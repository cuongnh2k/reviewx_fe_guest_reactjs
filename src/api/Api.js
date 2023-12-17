const Api = {
    bAuthsActivePOST: {
        path: "/basic/auths/active",
        method: "POST",
        contentType: "application/json",
    },
    bAuthsResetPasswordPOST: {
        path: "/basic/auths/reset-password",
        method: "POST",
        contentType: "application/json",
    },
    bAuthsSignInPOST: {
        path: "/basic/auths/sign-in",
        method: "POST",
        contentType: "application/json",
    },
    bAuthsSignUpPOST: {
        path: "/basic/auths/sign-up",
        method: "POST",
        contentType: "application/json",
    },

    bCategoriesGET: {
        path: "/basic/categories",
        method: "GET",
        contentType: "application/json",
    },

    bObjectsV2GET: {
        path: "/basic/objects-v2",
        method: "GET",
        contentType: "application/json",
    }, bObjectsV2IdGET: {
        path: "/basic/objects-v2/{id}",
        method: "GET",
        contentType: "application/json",
    },

    bReviewsGET: {
        path: "/basic/reviews",
        method: "GET",
        contentType: "application/json",
    }, bReviewsIdGET: {
        path: "/basic/reviews/{id}",
        method: "GET",
        contentType: "application/json",
    }
}
export default Api