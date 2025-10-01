(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/src/lib/analytics.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const GA_MEASUREMENT_ID = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
const pageview = (url)=>{
    if ("object" !== 'undefined' && window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID, {
            page_path: url
        });
    }
};
const event = (param)=>{
    let { action, category, label, value } = param;
    if ("object" !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value
        });
    }
};
const trackDemoRequest = (locale)=>{
    event({
        action: 'demo_request',
        category: 'conversion',
        label: "demo_request_".concat(locale)
    });
};
const trackLanguageSwitch = (from, to)=>{
    event({
        action: 'language_switch',
        category: 'engagement',
        label: "".concat(from, "_to_").concat(to)
    });
};
const initGA = ()=>{
    if (!GA_MEASUREMENT_ID) {
        console.warn('Google Analytics Measurement ID not configured');
        return;
    }
    // Load gtag script
    const script = document.createElement('script');
    script.src = "https://www.googletagmanager.com/gtag/js?id=".concat(GA_MEASUREMENT_ID);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/lib/hubspot.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const HUBSPOT_PORTAL_ID = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || '';
const HUBSPOT_FORM_ID = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_HUBSPOT_FORM_ID || '';
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
        const response = await fetch("https://api.hsforms.com/submissions/v3/integration/submit/".concat(HUBSPOT_PORTAL_ID, "/").concat(HUBSPOT_FORM_ID), {
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
    script.src = "//js.hs-scripts.com/".concat(HUBSPOT_PORTAL_ID, ".js");
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
};
const trackHubSpotPageView = ()=>{
    if ("object" !== 'undefined' && window._hsq) {
        window._hsq.push([
            'trackPageView'
        ]);
    }
};
const trackHubSpotEvent = function(eventName) {
    let properties = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if ("object" !== 'undefined' && window._hsq) {
        window._hsq.push([
            'trackEvent',
            {
                id: eventName,
                ...properties
            }
        ]);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/components/AnalyticsProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnalyticsProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/analytics.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$hubspot$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/hubspot.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function AnalyticsProvider(param) {
    let { children } = param;
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnalyticsProvider.useEffect": ()=>{
            // Initialize analytics on mount
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initGA"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$hubspot$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initHubSpot"])();
        }
    }["AnalyticsProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnalyticsProvider.useEffect": ()=>{
            // Track page views on route changes
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pageview"])(pathname);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$hubspot$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackHubSpotPageView"])();
        }
    }["AnalyticsProvider.useEffect"], [
        pathname
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(AnalyticsProvider, "tjXKfJWuFDa0epp0CJaCeazyqhM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = AnalyticsProvider;
var _c;
__turbopack_context__.k.register(_c, "AnalyticsProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend_src_162d47a7._.js.map