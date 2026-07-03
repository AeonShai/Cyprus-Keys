degistirilecek yapi iskeleti
"use client";
import dynamic from "next/dynamic";
import btnArrow from "@/assets/images/btn-arrow.svg"
import footerBigLogo from "@/assets/images/footer-big-logo.png"
import Image from "next/image";
import Link from "next/link";

const FooterV1 = () => {
    return (
        <>
            <footer className="footer-area">
                <div className="footer-top">
                    <div className="row">

                        {/* Company Section */}
                        <div className="col-md-3">
                            <div className="footer-widget footer-link">
                                <div className="footer-widget-top">
                                    <h4>COMPANY</h4>
                                    <ul>
                                        <li>
                                            <Link className="with-border" href="/about">
                                                <Image src={btnArrow} alt="icon" /> About Us
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="with-border" href="/about">
                                                <Image src={btnArrow} alt="icon" /> Members
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="with-border" href="/about">
                                                <Image src={btnArrow} alt="icon" /> Stories
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="with-border" href="/projects">
                                                <Image src={btnArrow} alt="icon" /> Projects
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="copyright">
                                    &copy; {(new Date().getFullYear())} ALL RIGHTS RESERVED
                                </div>
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="col-md-3">
                            <div className="footer-widget footer-link">
                                <div className="footer-contact-infos">
                                    <div className="footer-widget-top">
                                        <h4>REACH OUT TO US</h4>
                                        <div className="links">
                                            <div className="split-text-anim">
                                                <a data-aos="slide-up" data-aos-duration={700} href="tel:+840123456789" className="with-border">(+84) 0123456789</a>
                                            </div>
                                            <div className="split-text-anim">
                                                <a data-aos="slide-up" data-aos-duration={700} href="mailto:MindBlowingArt2692@gmail.com" className="with-border">MindBlowingArt2692@gmail.com</a>
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="/contact" className="theme-btn">
                                        {`Let's Connect`}
                                        <Image src={btnArrow} alt="icon" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Social Section */}
                        <div className="col-md-3">
                            <div className="footer-widget footer-link">
                                <div className="footer-widget-top">
                                    <h4>Social</h4>
                                    <ul>
                                        <li>
                                            <a className="with-border" href="https://instagram.com/" target="_blank">
                                                <Image src={btnArrow} alt="icon" /> Instagram
                                            </a>
                                        </li>
                                        <li>
                                            <a className="with-border" href="https://twitter.com/" target="_blank">
                                                <Image src={btnArrow} alt="icon" /> Twitter
                                            </a>
                                        </li>
                                        <li>
                                            <a className="with-border" href="https://behance.com/" target="_blank">
                                                <Image src={btnArrow} alt="icon" /> Behance
                                            </a>
                                        </li>
                                        <li>
                                            <a className="with-border" href="https://dribbble.com/" target="_blank">
                                                <Image src={btnArrow} alt="icon" /> Dribbble
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="copyright">
                                    BASED IN HANOI, VIETNAM
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="split-text-anim">
                        <Image data-aos="slide-up" data-aos-duration={700} src={footerBigLogo} alt="logo" />
                    </div>
                </div>
            </footer>
        </>
    );
};

export default dynamic(() => Promise.resolve(FooterV1), { ssr: false });
##### css
/* ===== # Footer ===== */
.footer-area .footer-bottom {
    height: 245px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.footer-area .footer-bottom .split-text-anim {
    width: 100%;
}

.footer-area .footer-bottom img {
    display: block;
    width: 100%;
}

.footer-area .footer-top {
    padding: 60px 72px 90px;
}

.footer-area .footer-top>.row .col-md-3:nth-child(2) {
    flex: 0 0 auto;
    width: 50%;
}

.footer-area .footer-top>.row .col-md-3:nth-child(3) .footer-widget .copyright {
    justify-content: flex-end;
}

.footer-area .footer-top>.row .col-md-3:nth-child(3) .footer-widget .footer-widget-top {
    align-items: flex-end;
}

.footer-area .footer-top>.row .col-md-3:nth-child(3) .footer-widget ul {
    align-items: flex-end;
}

.footer-area .footer-top>.row .col-md-3:nth-child(3) .footer-widget ul li a {
    justify-content: flex-end;
}

.footer-widget {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.footer-widget .copyright {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 18px;
    margin: 0;
    color: var(--tertiary);
    gap: 10px;
}

.footer-widget .copyright img {
    display: block;
}

.footer-widget .footer-widget-top {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
}

.footer-widget h4 {
    color: var(--tertiary);
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 500;
    margin: 0;
}

.footer-link ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
}

.footer-link ul li {
    display: block;
}

.footer-link ul li a {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--primary);
    text-transform: uppercase;
    text-decoration: none;
    line-height: 18px;
    font-size: 16px;
}

.footer-link ul li a img,
.footer-link ul li a svg {
    width: 10px;
    height: 10px;
    display: block;
}

.footer-widget .footer-social {
    text-align: right;
    align-items: flex-end;
}

.footer-contact-infos {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 64px;
}

.footer-contact-infos .footer-widget-top {
    align-items: center;
}

.footer-contact-infos .footer-widget-top a:before {
    height: 2px;
}

.footer-contact-infos .footer-widget-top .links {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.footer-contact-infos .footer-widget-top a {
    display: inline-block;
    color: var(--primary);
    font-size: 40px;
    line-height: 52px;
    font-weight: 400;
    text-decoration: none;
    overflow-wrap: anywhere;
}
