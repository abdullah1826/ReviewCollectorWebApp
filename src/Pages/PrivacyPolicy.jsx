import Navbar from "../components/Navbar";

import { useEffect } from "react";
import styles from "../Pages/Privacy.module.css"
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    const backbtn = ()=>{
        navigate(-1);
    }
    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
      }, []);
    
  return (
      <div className={styles.containerFluid}>

 <Navbar/>
 <div className="container">
    <button onClick={backbtn} style={{outline:"none"}} className={styles.backbutton}>Back</button>

<div className="text" style={{marginTop:'20px',padding:'10px'}}>
<p className="text-center" style={{fontSize:"30px",color:'#00000099'}}>Privacy Policy</p>
<h5 style={{fontSize:"25px"}}>Privacy Policy</h5>
This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our platform (the “Site”) the app, and the services related to them (collectively, together with the site, app, and the related services, our “Services”).


<h5>CONSENT</h5>

By using our website, you hereby consent to our Privacy Policy and agree to its terms.

<h5>PERSONAL INFORMATION WE COLLECT</h5>

When you visit the Site and app, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site and app, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.”
By using our website, you (the visitor) agree to allow third parties to process your IP address, in order to determine your location for the purpose of currency conversion. You also agree to have that currency stored in a session cookie in your browser (a temporary cookie that gets automatically removed when you close your browser). We do this in order for the selected currency to remain selected and consistent when browsing our website so that the prices can convert to your (the visitor) local currency.

<h5>We collect Device Information using the following technologies:</h5>

- “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier.
- “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.
- “Web beacons,” “tags,” and “pixels” are electronic files used to record information about how you browse the Site.
Additionally, when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers, email address, and phone number. We refer to this information as “Order Information.”
When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.

<h5>HOW DO WE USE YOUR PERSONAL INFORMATION?</h5>

We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:
Communicate with you; Screen our orders for potential risk or fraud; and
When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.
 We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).

<h5>SHARING YOUR PERSONAL INFORMATION</h5>

We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store--you can read more about how Shopify uses your Personal Information here:  https://www.shopify.com/legal/privacy. We also use Google Analytics to help us understand how our customers use the Site--you can read more about how Google uses your Personal Information here:  https://www.google.com/intl/en/policies/privacy/.  You can also opt-out of Google Analytics here:  https://tools.google.com/dlpage/gaoptout.
Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or another lawful request for information we receive, or to otherwise protect our rights.

<h5>BEHAVIOURAL ADVERTISING </h5>

As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.
You can opt-out of targeted advertising by using the links below:
- Facebook: https://www.facebook.com/settings/?tab=ads
- Google: https://www.google.com/settings/ads/anonymous
- Bing: https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads

<h5>DO NOT TRACK</h5>

Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.

<h5>YOUR RIGHTS</h5>

If you are a European resident, you have the right to access the personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below. Additionally, if you are a European resident, we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above.  Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.

DATA RETENTION

When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.

<h5>CHANGES</h5>

We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.

<h5>CONTACT US</h5>

For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us, at info@ReviewsCollector.com.
<p className="text-center">
Posted 19th February 2022 by Muhammad Abdullah

</p>

  </div>
</div>
</div>

  )
}

export default PrivacyPolicy
