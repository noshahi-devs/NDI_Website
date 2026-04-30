// @ts-nocheck
import { Component, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var gsap: any;
declare var ScrollTrigger: any;

@Component({
    selector: 'app-portfolio',
    standalone: true,
    imports: [],
    templateUrl: './portfolio.html',
    styleUrl: './portfolio.css',
})
export class PortfolioComponent implements AfterViewInit, OnDestroy {
    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.initScripts();
        }
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId) && typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.getAll().forEach((t: any) => t.kill());
        }
    }

    initScripts() {
        try {
            setTimeout(() => {
                window.openModal = (id) => this.openModal(id);
                window.closeModal = () => this.closeModal();

                if (typeof gsap !== 'undefined') {
                    gsap.registerPlugin(ScrollTrigger);

                    gsap.fromTo("h1", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "back.out(1)", delay: 0.2 });
                    
                    gsap.utils.toArray(".portfolio-card, .project-card, .group").forEach((card, i) => {
                        gsap.fromTo(card, { y: 40, opacity: 0 }, {
                            y: 0,
                            opacity: 1,
                            duration: 0.6,
                            scrollTrigger: {
                                trigger: card,
                                start: "top 90%",
                                toggleActions: "play none none reverse"
                            },
                            delay: (i % 3) * 0.1
                        });
                    });
                }
            }, 100);
        } catch (e) {
            console.error('Error initializing portfolio scripts', e);
        }
    }

    openModal(id) {
        const modal = document.getElementById('projectModal');
        const content = document.getElementById('modalContent');
        if (!modal || !content) return;

        const dataMap = {
            // Products
            'nim': {
                title: 'Noshahi Institute Manager (NIM)',
                description: 'A complete ERP solution for educational institutions, handling everything from admissions to examinations.',
                features: ['Student & Staff Management', 'Fee Collection & Accounting', 'Attendance & Timetable', 'Result & Report Generation'],
                image: 'https://picsum.photos/seed/nim/800/500'
            },
            'ntb': {
                title: 'Noshahi Test Builder (NTB)',
                description: 'Advanced assessment tool for creating, managing, and conducting examinations with ease.',
                features: ['Automated Question Bank', 'Multiple Test Formats', 'Instant Result Calculation', 'Secure Online Testing'],
                image: 'https://picsum.photos/seed/ntb/800/500'
            },
            'nvl': {
                title: 'Noshahi VirtuLearn (NVL)',
                description: 'An AI-driven virtual learning environment for students and professional training.',
                features: ['Virtual Classrooms', 'AI Learning Paths', 'Course Progress Analytics', 'Collaborative Tools'],
                image: 'https://picsum.photos/seed/nvl/800/500'
            },
            'nwt': {
                title: 'Noshahi Work Track (NWT)',
                description: 'A robust ecosystem for monitoring productivity and managing complex projects.',
                features: ['Live Work Tracking', 'Project Management', 'Performance Metrics', 'Team Communication'],
                image: 'https://picsum.photos/seed/nwt/800/500'
            },
            // Web Platforms
            'ndi-web': {
                title: 'Noshahi Developers Inc Website',
                description: 'The flagship corporate website for NDI, showcasing innovation and services.',
                features: ['Responsive Design', 'Service Showcases', 'Dynamic Portfolio', 'Client Inquiry Portal'],
                image: 'https://picsum.photos/seed/ndi/800/500'
            },
            'nim-web': { title: 'NIM Website', description: 'Dedicated portal for the NIM product ecosystem.', features: ['Product Demos', 'Documentation', 'Support Hub'], image: 'https://picsum.photos/seed/nimw/800/500' },
            'ntb-web': { title: 'NTB Website', description: 'Official platform for the Noshahi Test Builder.', features: ['Trial Signups', 'User Guides', 'Feature Lists'], image: 'https://picsum.photos/seed/ntbw/800/500' },
            'nvl-web': { title: 'NVL Website', description: 'The gateway to VirtuLearn training and resources.', features: ['Course Catalog', 'Learning LMS', 'Community Forum'], image: 'https://picsum.photos/seed/nvlw/800/500' },
            // Projects
            'homefilla': {
                title: 'Home Filla Website',
                description: 'Premium real estate listing and property management platform.',
                features: ['Property Search', 'Agent Dashboards', 'Listing Management', 'Lead Tracking'],
                image: 'https://picsum.photos/seed/home/800/500'
            },
            'noshcom': { title: 'NoshCom Website', description: 'Enterprise-grade e-commerce marketplace.', features: ['Multi-vendor Support', 'Secure Checkout', 'Inventory Sync'], image: 'https://picsum.photos/seed/shop/800/500' },
            'elicom': { title: 'Elicom Website', description: 'Industrial electrical services corporate site.', features: ['Service Catalog', 'Project Gallery', 'Inquiry Forms'], image: 'https://picsum.photos/seed/bolt/800/500' },
            'vcg': { title: 'VCG Website', description: 'Venture Capital Group networking and portfolio site.', features: ['Investment Portfolio', 'Partner Portal', 'News Hub'], image: 'https://picsum.photos/seed/vcg/800/500' },
            'worldcart': { title: 'World Cart Website', description: 'Global logistics tracking and supply chain platform.', features: ['Shipment Tracking', 'Warehouse Management', 'Quote Generator'], image: 'https://picsum.photos/seed/world/800/500' },
            'uberpay': { title: 'UberPay Website', description: 'Fintech platform for seamless global payments.', features: ['Payment Gateway', 'Fraud Detection', 'Merchant Dashboard'], image: 'https://picsum.photos/seed/pay/800/500' },
            'hacking': { title: 'Noshahi Hacking System', description: 'Ethical hacking and security testing environment.', features: ['Vulnerability Assessment', 'Penetration Testing Tools', 'Security Auditing'], image: 'https://picsum.photos/seed/hack/800/500' },
            'noshvallet': { title: 'NoshVallet', description: 'Secure digital asset and cryptocurrency wallet.', features: ['Multi-coin Support', 'Secure Keys', 'Transaction History'], image: 'https://picsum.photos/seed/coin/800/500' },
            'itcenter': { title: 'Noshahi IT Center', description: 'Consolidated hub for IT infrastructure services.', features: ['Support Ticketing', 'Infrastructure Monitoring', 'Resource Library'], image: 'https://picsum.photos/seed/it/800/500' }
        };

        const data = dataMap[id] || dataMap['nim'];
        content.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <img src="${data.image}" alt="${data.title}" class="w-full h-72 object-cover rounded-3xl shadow-lg">
                </div>
                <div>
                    <h3 class="text-3xl font-black text-gray-900 mb-4">${data.title}</h3>
                    <p class="text-gray-700 mb-6 leading-relaxed">${data.description}</p>
                    <h4 class="text-xl font-bold text-gray-900 mb-4">Key Features:</h4>
                    <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                        ${data.features.map(f => `<li class="flex items-center gap-2 text-sm text-gray-700"><i class="fas fa-check text-orange-600"></i> ${f}</li>`).join('')}
                    </ul>
                    <div class="flex gap-4">
                        <button class="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition shadow-lg">Live Demo</button>
                        <button onclick="closeModal()" class="border-2 border-gray-200 text-gray-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition">Close</button>
                    </div>
                </div>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
}
