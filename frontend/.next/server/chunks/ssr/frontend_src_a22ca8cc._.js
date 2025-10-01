module.exports = [
"[project]/frontend/src/lib/analytics.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Google Analytics 4 Integration
// Ready for configuration once GA4 Measurement ID is provided
__turbopack_context__.s([
    "GA_MEASUREMENT_ID",
    ()=>GA_MEASUREMENT_ID,
    "event",
    ()=>event,
    "initGA",
    ()=>initGA,
    "pageview",
    ()=>pageview,
    "trackDemoRequest",
    ()=>trackDemoRequest,
    "trackLanguageSwitch",
    ()=>trackLanguageSwitch
]);
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
const pageview = (url)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
};
const event = ({ action, category, label, value })=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
};
const trackDemoRequest = (locale)=>{
    event({
        action: 'demo_request',
        category: 'conversion',
        label: `demo_request_${locale}`
    });
};
const trackLanguageSwitch = (from, to)=>{
    event({
        action: 'language_switch',
        category: 'engagement',
        label: `${from}_to_${to}`
    });
};
const initGA = ()=>{
    if (!GA_MEASUREMENT_ID) {
        console.warn('Google Analytics Measurement ID not configured');
        return;
    }
    // Load gtag script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);
    // Initialize gtag
    window.gtag = window.gtag || function(command, targetId, config) {
        // eslint-disable-next-line prefer-rest-params
        (window.gtag.q = window.gtag.q || []).push(arguments);
    };
    window.gtag('js', new Date().toISOString());
    window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: window.location.pathname
    });
};
}),
"[project]/frontend/src/lib/hubspot.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// HubSpot Integration
// Ready for configuration once HubSpot Portal ID is provided
__turbopack_context__.s([
    "HUBSPOT_FORM_ID",
    ()=>HUBSPOT_FORM_ID,
    "HUBSPOT_PORTAL_ID",
    ()=>HUBSPOT_PORTAL_ID,
    "initHubSpot",
    ()=>initHubSpot,
    "submitToHubSpot",
    ()=>submitToHubSpot,
    "trackHubSpotEvent",
    ()=>trackHubSpotEvent,
    "trackHubSpotPageView",
    ()=>trackHubSpotPageView
]);
const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || '';
const HUBSPOT_FORM_ID = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID || '';
const submitToHubSpot = async (formData)=>{
    if (!HUBSPOT_PORTAL_ID || !HUBSPOT_FORM_ID) {
        console.warn('HubSpot configuration missing. Form data:', formData);
        // Return mock success for now
        return new Promise((resolve)=>{
            setTimeout(()=>resolve(true), 1000);
        });
    }
    try {
        const submissionData = {
            fields: [
                {
                    name: 'firstname',
                    value: formData.name.split(' ')[0] || formData.name
                },
                {
                    name: 'lastname',
                    value: formData.name.split(' ').slice(1).join(' ') || ''
                },
                {
                    name: 'email',
                    value: formData.email
                },
                {
                    name: 'company',
                    value: formData.company
                },
                {
                    name: 'phone',
                    value: formData.phone || ''
                },
                {
                    name: 'message',
                    value: formData.message || ''
                },
                {
                    name: 'hs_language',
                    value: formData.locale === 'es' ? 'es' : 'en'
                }
            ],
            context: {
                pageUri: window.location.href,
                pageName: document.title,
                hutk: getHubSpotCookie()
            }
        };
        const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submissionData)
        });
        if (response.ok) {
            console.log('HubSpot form submitted successfully');
            return true;
        } else {
            console.error('HubSpot form submission failed:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error submitting to HubSpot:', error);
        return false;
    }
};
// Get HubSpot tracking cookie
const getHubSpotCookie = ()=>{
    if (typeof document === 'undefined') return null;
    const name = 'hubspotutk=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++){
        let c = ca[i];
        while(c.charAt(0) === ' '){
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
};
const initHubSpot = ()=>{
    if (!HUBSPOT_PORTAL_ID) {
        console.warn('HubSpot Portal ID not configured');
        return;
    }
    // Load HubSpot tracking code
    const script = document.createElement('script');
    script.src = `//js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
};
const trackHubSpotPageView = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
};
const trackHubSpotEvent = (eventName, properties = {})=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
};
}),
"[project]/frontend/src/components/AnalyticsProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnalyticsProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$analytics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/analytics.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$hubspot$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/hubspot.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function AnalyticsProvider({ children }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Initialize analytics on mount
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$analytics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initGA"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$hubspot$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initHubSpot"])();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Track page views on route changes
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$analytics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pageview"])(pathname);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$hubspot$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trackHubSpotPageView"])();
    }, [
        pathname
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}),
];

//# sourceMappingURL=frontend_src_a22ca8cc._.js.map