___INFO___
displayName: GA4 Custom Interaction Event Handler
description: Reads data-gtm-* attributes from clicked or submitted elements and sends a GA4 event.
version: 1.1
author: Your Name/Company
categories: ["Analytics", "Google"]
documentation: "" // Add a link to your own documentation if you create some

___SANDBOXED_JS_PERMISSIONS___
[
  {
    "type": "sendPixel",
    "resolvedTo": ["https://*.google-analytics.com/*", "https://*.analytics.google.com/*"]
  },
  {
    "type": "accessDataLayer",
    "properties": {
      "read": true,
      "write": false
    }
  },
  {
    "type": "readDOM",
    "properties": {
       "readAttributes": true
    }
  },
  {
    "type": "getReferrer",
    "properties": {
      "read": true
    }
  },
  {
    "type": "getContainerVersion",
    "properties": {
      "read": true
    }
  },
  {
    "type": "getHtml",
    "properties": {
      "read": true
    }
  }
]

___FIELDS___
[
  {
    "name": "gaMeasurementId",
    "displayName": "GA4 Measurement ID",
    "type": "TEXT",
    "simpleValidators": ["required", "nonEmpty"],
    "valueValidators": [
        {
          "type": "matchesRegex",
          "args": ["^G-[A-Z0-9]+$"]
        }
      ],
    "helpText": "Enter your GA4 Measurement ID (e.g., G-XXXXXXXXXX)."
  },
  {
    "name": "ga4EventName",
    "displayName": "GA4 Event Name",
    "type": "TEXT",
    "simpleValidators": ["required", "nonEmpty"],
    "defaultValue": "custom_interaction",
    "helpText": "The name for the GA4 event (e.g., custom_interaction, user_engagement)."
  },
  {
    "name": "debugMode",
    "displayName": "Enable Debug Logging",
    "type": "CHECKBOX",
    "defaultValue": false,
    "helpText": "Enable to log details to the console for debugging (visible in GTM Preview mode). Disable for production."
  }
]

___GA_EVENT_PARAMETERS___
[
  {
    "name": "event_category",
    "displayName": "Event Category",
    "type": "TEXT"
  },
  {
    "name": "event_action",
    "displayName": "Event Action",
    "type": "TEXT"
  },
  {
    "name": "event_label",
    "displayName": "Event Label",
    "type": "TEXT"
  }
]

___SANDBOXED_JS_CODE___
const log = data.debugMode ? require('logToConsole') : (() => {});
const sendGaEvent = require('sendGaEvent');
const getEventData = require('getEventData');

let targetElement;
const eventModel = getEventData(); // Gets data about the GTM event (e.g., gtm.click, gtm.formSubmit)

// Determine the source element based on GTM event type
// 'gtm.element' holds the DOM element that triggered the event
if (eventModel['gtm.element']) {
  targetElement = eventModel['gtm.element'];
}

if (targetElement) {
  log('GTM Handler: Target Element Found:', targetElement);

  // Access data-* attributes. GTM converts them to camelCase in the dataset object.
  // e.g., data-gtm-event-category becomes targetElement.dataset.gtmEventCategory
  const gtmEventCategory = targetElement.dataset.gtmEventCategory;
  const gtmEventAction = targetElement.dataset.gtmEventAction;
  const gtmEventLabel = targetElement.dataset.gtmEventLabel; // This will be undefined if the attribute is not present

  if (gtmEventCategory && gtmEventAction) {
    log('GTM Handler: Data Attributes Found: Category:', gtmEventCategory, 'Action:', gtmEventAction, 'Label:', gtmEventLabel);

    const eventParameters = {
      'event_category': gtmEventCategory,
      'event_action': gtmEventAction
    };
    if (gtmEventLabel !== undefined) { // Only add label if it exists
      eventParameters.event_label = gtmEventLabel;
    }

    // --- You can extend this to collect other data-gtm-* attributes ---
    // Example: if you add data-gtm-value="10" to an element:
    // if (targetElement.dataset.gtmValue) {
    //   eventParameters.value = targetElement.dataset.gtmValue;
    // }
    // Make sure to also add 'value' to ___GA_EVENT_PARAMETERS___ section if you do this.

    sendGaEvent(data.gaMeasurementId, data.ga4EventName, eventParameters);
    log('GTM Handler: GA4 Event Sent:', data.ga4EventName, 'To ID:', data.gaMeasurementId, 'Parameters:', eventParameters);
    
    // Signal GTM that the tag executed successfully
    data.gtmOnSuccess();
  } else {
    log('GTM Handler: Required data attributes (data-gtm-event-category or data-gtm-event-action) not found on the element.');
    data.gtmOnFailure();
  }
} else {
  log('GTM Handler: No target element found for GTM event:', eventModel.event);
  data.gtmOnFailure();
}

___NOTES___
// How to use this template:
// 1. This template is designed to work with HTML elements that have 'data-gtm-event-category' and 'data-gtm-event-action' attributes. The 'data-gtm-event-label' attribute is optional.
// 2. Create a new Tag in GTM using this Custom Template.
// 3. Configure the "GA4 Measurement ID" and "GA4 Event Name" fields in the tag.
//
// 4. Set up Triggers:
//    a. For Clicks:
//       - Trigger Type: "Click - All Elements"
//       - This trigger fires on: "Some Clicks"
//       - Condition: "Click Element" matches CSS selector ".gtm-track-click" (or "Click Classes" contains "gtm-track-click").
//    b. For Form Submissions:
//       - Trigger Type: "Form Submission"
//       - This trigger fires on: "Some Forms"
//       - Condition: "Form Element" matches CSS selector ".gtm-track-submit" (or "Form Classes" contains "gtm-track-submit").
//       - (Optional) Enable "Wait for Tags" and "Check Validation" if needed for your forms.
//
// 5. AJAX Form Submissions (Success/Failure):
//    - This template handles the initial form submission attempt if the <form> tag has the data-gtm-* attributes.
//    - For tracking the actual SUCCESS or FAILURE of AJAX form submissions (like your newsletter or contact form), you should push a separate event to the dataLayer from your website's JavaScript *after* the AJAX request completes.
//    - Example dataLayer push from your JavaScript:
//      window.dataLayer = window.dataLayer || [];
//      if (submissionWasSuccessful) {
//        window.dataLayer.push({
//          'event': 'form_submit_result',
//          'form_name': 'Newsletter Subscription', // Or 'Contact Form'
//          'submit_status': 'success',
//          'event_category': 'Form Interaction', // Optional: override or add
//          'event_action': 'Submit Success',    // Optional: override or add
//          'event_label': 'Newsletter'        // Optional: override or add
//        });
//      } else {
//        window.dataLayer.push({
//          'event': 'form_submit_result',
//          'form_name': 'Newsletter Subscription',
//          'submit_status': 'failure',
//          'error_message': 'The error message from server', // example
//          'event_category': 'Form Interaction',
//          'event_action': 'Submit Failure',
//          'event_label': 'Newsletter'
//        });
//      }
//    - In GTM, you would then create:
//      - A "Custom Event" trigger for the event name 'form_submit_result'.
//      - Data Layer Variables to capture 'form_name', 'submit_status', 'error_message'.
//      - A separate GA4 Event tag that uses this trigger and these variables.