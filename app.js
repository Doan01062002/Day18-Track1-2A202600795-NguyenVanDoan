/**
 * AI Travel Planner - Human-Centered AI Design Prototype
 * Student: Nguyễn Văn Đoan (MãHV: 2A202600795)
 * Batch: VinUni AI20k - Batch 02 - Track 1
 */

class AITravelPlannerApp {
    constructor() {
        this.currentTab = 'tab-flow';
        this.onboardingSlide = 1;
        
        // Hotel Data with attribute scores (scaled 0-10)
        this.hotels = [
            {
                id: 'hotel-tms',
                name: 'TMS Luxury Hotel Danang',
                beachProximity: 9.8, // Very close
                economy: 2.0,       // Expensive (3.5M/night)
                rating: 9.6,        // 4.8/5
                priceStr: '3.500.000đ/đêm',
                location: 'Bãi biển Mỹ Khê, Đà Nẵng',
                ratingStr: '4.8 (1,240 đánh giá)',
                imgUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=150&q=80',
                explainStr: 'Được đề xuất hàng đầu vì sát biển (9.8/10) và điểm đánh giá vượt trội, phù hợp phong cách nghỉ dưỡng của bạn.'
            },
            {
                id: 'hotel-han',
                name: 'Han River Boutique Hotel',
                beachProximity: 2.0, // Far from beach
                economy: 9.5,       // Cheap (950k/night)
                rating: 8.4,        // 4.2/5
                priceStr: '950.000đ/đêm',
                location: 'Đường Bạch Đằng, Trung tâm Đà Nẵng',
                ratingStr: '4.2 (340 đánh giá)',
                imgUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=150&q=80',
                explainStr: 'Lựa chọn tiết kiệm chi phí tối đa (gần sông Hàn, cách biển 3km).'
            },
            {
                id: 'hotel-guesthouse',
                name: 'Danang Beachside Guest House',
                beachProximity: 8.0, // Walkable
                economy: 7.5,       // Moderate (1.45M/night)
                rating: 9.0,        // 4.5/5
                priceStr: '1.450.000đ/đêm',
                location: 'Đường An Thượng, Đà Nẵng',
                ratingStr: '4.5 (512 đánh giá)',
                imgUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=150&q=80',
                explainStr: 'Điểm cân bằng tốt giữa vị trí gần biển đi bộ được và chi phí phải chăng.'
            }
        ];

        // Default weights for hotel recommendation
        this.weights = {
            beach: 40,
            price: 30,
            rating: 30
        };

        // Day 2 original activities (Overloaded)
        this.originalActivitiesDay2 = [
            { time: '08:00', title: 'Ăn sáng Mỳ Quảng Bà Mua', desc: 'Ẩm thực đặc sản Đà Nẵng.', duration: '1h' },
            { time: '09:30', title: 'Tham quan Ngũ Hành Sơn', desc: 'Leo núi và khám phá hang động tâm linh.', duration: '2.5h' },
            { time: '12:30', title: 'Ăn trưa hải sản Năm Đảnh', desc: 'Thưởng thức hải sản bình dân.', duration: '1.5h' },
            { time: '14:30', title: 'Tham quan Bán đảo Sơn Trà & Chùa Linh Ứng', desc: 'Ngắm tượng Phật Bà cao nhất Việt Nam.', duration: '2h' },
            { time: '17:00', title: 'Tắm biển Mỹ Khê', desc: 'Bãi biển lọt top đẹp nhất hành tinh.', duration: '1.5h' },
            { time: '19:00', title: 'Ăn tối bánh tráng cuốn thịt heo Trần', desc: 'Đặc sản Đà Nẵng.', duration: '1.2h' },
            { time: '20:30', title: 'Xem Cầu Rồng phun lửa/nước', desc: 'Địa điểm biểu tượng (Chỉ cuối tuần).', duration: '1h' }
        ];

        // Day 2 optimized activities
        this.optimizedActivitiesDay2 = [
            { time: '08:30', title: 'Ăn sáng Mỳ Quảng Bà Mua', desc: 'Thong thả khởi đầu ngày mới.', duration: '1h' },
            { time: '10:00', title: 'Tắm biển & Nghỉ ngơi tại bãi biển Mỹ Khê', desc: 'Tận hưởng không gian thư giãn.', duration: '2h' },
            { time: '12:30', title: 'Ăn trưa hải sản Năm Đảnh', desc: 'Thưởng thức hải sản.', duration: '1.5h' },
            { time: '15:00', title: 'Tham quan Bán đảo Sơn Trà & Chùa Linh Ứng', desc: 'Thời gian đi lại thoải mái hơn.', duration: '2h' },
            { time: '18:30', title: 'Ăn tối bánh tráng cuốn thịt heo Trần', desc: 'Đặc sản Đà Nẵng.', duration: '1.2h' }
        ];

        // Day 3 activities before recovery
        this.originalActivitiesDay3 = [
            { time: '09:00', title: 'Mua sắm đặc sản chợ Hàn', desc: 'Mua quà lưu niệm và đồ ăn khô.', duration: '2h' },
            { time: '12:00', title: 'Trả phòng khách sạn & Ăn nhẹ', desc: 'Chuẩn bị hành lý.', duration: '1.5h' },
            { time: '14:00', title: 'Di chuyển ra Sân bay Đà Nẵng', desc: 'Kết thúc hành trình.', duration: '1h' }
        ];

        // Day 3 activities after recovery (3 activities moved from Day 2)
        this.recoveredActivitiesDay3 = [
            { time: '08:30', title: 'Tham quan Ngũ Hành Sơn', desc: 'Dời từ Ngày 2 để giãn lịch trình.', duration: '2h', moved: true },
            { time: '11:00', title: 'Mua sắm đặc sản chợ Hàn', desc: 'Mua quà lưu niệm.', duration: '1.5h' },
            { time: '13:00', title: 'Ăn trưa & Trả phòng khách sạn', desc: 'Chuẩn bị kết thúc chuyến đi.', duration: '1.5h' },
            { time: '15:00', title: 'Xem Cầu Rồng phun lửa/nước (hoặc check-in)', desc: 'Dời từ Ngày 2.', duration: '1h', moved: true },
            { time: '16:30', title: 'Di chuyển ra Sân bay Đà Nẵng', desc: 'Kết thúc hành trình.', duration: '1h' }
        ];

        this.itineraryState = 'overloaded'; // 'overloaded' or 'optimized'
        this.activeItineraryDay = 2;

        // Theme preference
        this.isDarkTheme = true;
        this.rationaleExpanded = false;
    }

    init() {
        this.registerEventListeners();
        this.renderHotels();
        this.renderItinerary();
        this.updateRationaleText();
        this.initializeTheme();
    }

    registerEventListeners() {
        // Theme toggle button
        const themeBtn = document.getElementById('theme-toggle-btn');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => this.toggleTheme());
        }
    }

    initializeTheme() {
        // Apply initial body theme class
        const body = document.body;
        if (this.isDarkTheme) {
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
        } else {
            body.classList.add('light-theme');
            body.classList.remove('dark-theme');
        }
    }

    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        const body = document.body;
        const themeIcon = document.querySelector('#theme-toggle-btn i');
        
        if (this.isDarkTheme) {
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
            if (themeIcon) {
                themeIcon.className = 'fa-solid fa-moon';
            }
        } else {
            body.classList.add('light-theme');
            body.classList.remove('dark-theme');
            if (themeIcon) {
                themeIcon.className = 'fa-solid fa-sun';
            }
        }
    }

    toggleRationaleSize() {
        const rationalePanel = document.querySelector('.rationale-panel');
        const viewportPanel = document.querySelector('.viewport-panel');
        const toggleBtn = document.getElementById('toggle-rationale-view');
        
        this.rationaleExpanded = !this.rationaleExpanded;
        if (this.rationaleExpanded) {
            rationalePanel.classList.add('expanded');
            viewportPanel.classList.add('collapsed');
            if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-compress"></i> Thu nhỏ';
        } else {
            rationalePanel.classList.remove('expanded');
            viewportPanel.classList.remove('collapsed');
            if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-expand"></i> Phóng to';
        }
    }

    activateTab(tabId) {
        // Update state
        this.currentTab = tabId;

        // Toggle active class on navigation links
        document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const navIdMap = {
            'tab-flow': 'nav-flow',
            'tab-onboarding': 'nav-onboarding',
            'tab-context': 'nav-context',
            'tab-explainability': 'nav-explainability',
            'tab-recovery': 'nav-recovery',
            'tab-agency': 'nav-agency',
            'tab-feedback-loop': 'nav-feedback-loop',
            'tab-rationale': 'nav-rationale',
            'tab-demo': 'nav-demo'
        };

        const activeNavLink = document.getElementById(navIdMap[tabId]);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }

        // Toggle active class on tab content panes
        document.querySelectorAll('.viewport-content .tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });

        const activePane = document.getElementById(tabId);
        if (activePane) {
            activePane.classList.add('active');
        }

        // Update viewport state badge
        const stateBadge = document.getElementById('viewport-state-badge');
        const stateNames = {
            'tab-flow': 'Tổng quan & Bản đồ',
            'tab-onboarding': 'Thiết lập Onboarding (T0)',
            'tab-context': 'Khai thác Nhu cầu (T2)',
            'tab-explainability': 'Minh bạch & Trọng số gợi ý (T3)',
            'tab-recovery': 'Báo lỗi & Phục hồi lịch trình (T6)',
            'tab-agency': 'Ranh giới tự chủ AI (T9)',
            'tab-feedback-loop': 'Ma trận phản hồi 2×2',
            'tab-rationale': 'Tài liệu Q&A Lab',
            'tab-demo': 'Hướng dẫn chạy demo 5 phút'
        };
        if (stateBadge) {
            stateBadge.innerText = `Trạng thái: ${stateNames[tabId]}`;
        }

        // Update rationale panel text
        this.updateRationaleText();

        // Specific actions on loading certain tabs
        if (tabId === 'tab-explainability') {
            this.renderHotels();
        } else if (tabId === 'tab-recovery') {
            this.renderItinerary();
        }
    }

    // ==========================================
    // ONBOARDING (T0) LOGIC
    // ==========================================
    moveOnboarding(direction) {
        let newSlide = this.onboardingSlide + direction;
        if (newSlide >= 1 && newSlide <= 3) {
            this.setOnboardingSlide(newSlide);
        } else if (newSlide > 3) {
            // Finished onboarding -> Go to Context
            this.activateTab('tab-context');
        }
    }

    setOnboardingSlide(slideNum) {
        this.onboardingSlide = slideNum;
        
        // Update slide visibility
        document.querySelectorAll('.ob-slide').forEach((slide, idx) => {
            if (idx + 1 === slideNum) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update dots
        document.querySelectorAll('.ob-dots .dot').forEach((dot, idx) => {
            if (idx + 1 === slideNum) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update progress bar
        const progressFill = document.getElementById('ob-progress');
        if (progressFill) {
            progressFill.style.width = `${(slideNum / 3) * 100}%`;
        }

        // Update buttons
        const prevBtn = document.getElementById('ob-prev-btn');
        const nextBtn = document.getElementById('ob-next-btn');
        
        if (prevBtn) {
            prevBtn.style.visibility = slideNum === 1 ? 'hidden' : 'visible';
        }
        
        if (nextBtn) {
            if (slideNum === 3) {
                nextBtn.innerText = 'Hoàn thành Onboarding';
            } else {
                nextBtn.innerText = 'Tiếp theo';
            }
        }
    }

    // ==========================================
    // CONTEXT GATHERING (T2) LOGIC
    // ==========================================
    submitClarify() {
        const durationSelect = document.getElementById('trip-duration');
        const companionSelect = document.getElementById('trip-companion');
        const styleSelect = document.getElementById('trip-style');
        
        // Show active processing state in UI
        const clarifyCard = document.querySelector('.clarification-card');
        const loadingState = document.getElementById('ai-loading-state');
        
        if (clarifyCard) {
            clarifyCard.style.opacity = '0.5';
            clarifyCard.style.pointerEvents = 'none';
        }
        
        if (loadingState) {
            loadingState.classList.remove('hidden');
            
            // Scroll to bottom
            const container = document.getElementById('chat-messages-container');
            if (container) {
                container.scrollTop = container.scrollHeight;
            }

            // Simulate log steps progressing
            setTimeout(() => {
                const step1 = document.getElementById('log-step-1');
                if (step1) step1.innerHTML = '<i class="fa-solid fa-circle-check text-green"></i> Đã hiểu bối cảnh: Đà Nẵng, ' + durationSelect.value + ' ngày, ' + companionSelect.options[companionSelect.selectedIndex].text + '.';
                if (step1) step1.className = 'step-log success';
                
                const step2 = document.getElementById('log-step-2');
                if (step2) step2.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang lọc 120+ khách sạn & resort tại Đà Nẵng...';
                if (step2) step2.className = 'step-log active';
            }, 1200);

            setTimeout(() => {
                const step2 = document.getElementById('log-step-2');
                if (step2) step2.innerHTML = '<i class="fa-solid fa-circle-check text-green"></i> Đã tìm thấy 3 khách sạn tối ưu cho phong cách ' + styleSelect.options[styleSelect.selectedIndex].text + '.';
                if (step2) step2.className = 'step-log success';
                
                const step3 = document.getElementById('log-step-3');
                if (step3) step3.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang cấu hình lịch trình di chuyển tối ưu...';
                if (step3) step3.className = 'step-log active';
            }, 2600);

            setTimeout(() => {
                const step3 = document.getElementById('log-step-3');
                if (step3) step3.innerHTML = '<i class="fa-solid fa-circle-check text-green"></i> Đã sẵn sàng lịch trình du lịch Đà Nẵng.';
                if (step3) step3.className = 'step-log success';
                
                // Add final system helper message
                const msgContainer = document.getElementById('chat-messages-container');
                const newMsg = document.createElement('div');
                newMsg.className = 'message message-system';
                newMsg.innerHTML = '<i class="fa-solid fa-circle-info text-indigo"></i> AI đề xuất hoàn tất. Mời bạn sang tab <strong>03. Minh bạch gợi ý</strong> để kiểm tra phòng và tiêu chí xếp hạng.';
                msgContainer.appendChild(newMsg);
                msgContainer.scrollTop = msgContainer.scrollHeight;

                // Enable button to jump to next phase
                const nextStepBtn = document.createElement('button');
                nextStepBtn.className = 'btn btn-accent btn-sm align-center margin-top-sm pulse';
                nextStepBtn.style.alignSelf = 'center';
                nextStepBtn.innerHTML = 'Khám phá khách sạn gợi ý <i class="fa-solid fa-chevron-right"></i>';
                nextStepBtn.onclick = () => {
                    app.activateTab('tab-explainability');
                };
                msgContainer.appendChild(nextStepBtn);
                msgContainer.scrollTop = msgContainer.scrollHeight;
            }, 4000);
        }
    }

    skipClarify() {
        // Pre-fill fields with defaults
        document.getElementById('trip-duration').value = "3";
        document.getElementById('trip-companion').value = "friends";
        document.getElementById('trip-style').value = "relax";
        
        // Log implicit skip behavior rationale
        const msgContainer = document.getElementById('chat-messages-container');
        const skipMsg = document.createElement('div');
        skipMsg.className = 'message message-system';
        skipMsg.innerHTML = '<i class="fa-solid fa-circle-info text-muted"></i> Bạn đã chọn bỏ qua chi tiết. Hệ thống tự động dùng tham số mặc định: 3 ngày, đi với bạn bè, phong cách nghỉ dưỡng.';
        msgContainer.appendChild(skipMsg);
        
        this.submitClarify();
    }

    // ==========================================
    // EXPLAINABLE RECOMMENDATIONS (T3) LOGIC
    // ==========================================
    updateWeights() {
        const wBeach = parseInt(document.getElementById('weight-beach').value);
        const wPrice = parseInt(document.getElementById('weight-price').value);
        const wRating = parseInt(document.getElementById('weight-rating').value);
        
        // Normalize values to show on UI
        document.getElementById('val-beach').innerText = `${wBeach}%`;
        document.getElementById('val-price').innerText = `${wPrice}%`;
        document.getElementById('val-rating').innerText = `${wRating}%`;

        this.weights = { beach: wBeach, price: wPrice, rating: wRating };
        
        // Re-render based on new weight scores
        this.renderHotels();
    }

    resetWeights() {
        document.getElementById('weight-beach').value = 40;
        document.getElementById('weight-price').value = 30;
        document.getElementById('weight-rating').value = 30;
        this.updateWeights();
    }

    renderHotels() {
        const container = document.getElementById('hotels-list-container');
        if (!container) return;

        // Calculate scores for each hotel based on weights
        const scoredHotels = this.hotels.map(hotel => {
            const sumWeights = this.weights.beach + this.weights.price + this.weights.rating;
            let score = 0;
            if (sumWeights > 0) {
                score = (hotel.beachProximity * this.weights.beach + 
                         hotel.economy * this.weights.price + 
                         hotel.rating * this.weights.rating) / sumWeights;
            } else {
                score = (hotel.beachProximity + hotel.economy + hotel.rating) / 3;
            }
            return { ...hotel, calculatedScore: score };
        });

        // Sort hotels descending by calculated score
        scoredHotels.sort((a, b) => b.calculatedScore - a.calculatedScore);

        // Build UI HTML
        container.innerHTML = '';
        scoredHotels.forEach((hotel, index) => {
            const isFirst = index === 0;
            const cardClass = isFirst ? 'hotel-card first-rank' : 'hotel-card';
            
            // Build dynamic explain text based on highest weight contribution
            let dynamicExplain = '';
            if (isFirst) {
                const contributors = [
                    { name: 'vị trí gần biển', val: hotel.beachProximity * this.weights.beach },
                    { name: 'giá cả tiết kiệm', val: hotel.economy * this.weights.price },
                    { name: 'đánh giá tốt', val: hotel.rating * this.weights.rating }
                ];
                contributors.sort((a, b) => b.val - a.val);
                dynamicExplain = `<div class="hotel-explain-box open">
                    <i class="fa-solid fa-robot"></i>
                    <span><strong>Giải thích vị trí #1:</strong> Do bạn ưu tiên <strong>${contributors[0].name}</strong>, khách sạn này được xếp đầu tiên (Điểm quy đổi: ${(hotel.calculatedScore * 10).toFixed(1)}/100).</span>
                </div>`;
            }

            container.innerHTML += `
                <div class="${cardClass}" id="hotel-card-${hotel.id}">
                    <div class="rank-badge">${index + 1}</div>
                    <div class="hotel-thumb" style="background-image: url('${hotel.imgUrl}')"></div>
                    <div class="hotel-details">
                        <div class="hotel-name-row">
                            <div>
                                <h4>${hotel.name}</h4>
                                <p class="subtext"><i class="fa-solid fa-location-dot"></i> ${hotel.location}</p>
                            </div>
                            <span class="hotel-price">${hotel.priceStr}</span>
                        </div>
                        <div class="hotel-meta-row">
                            <span><i class="fa-solid fa-star"></i> Đánh giá: ${hotel.ratingStr}</span>
                            <span><i class="fa-solid fa-umbrella-beach"></i> Gần biển: ${hotel.beachProximity.toFixed(1)}/10</span>
                        </div>
                        ${dynamicExplain}
                        <div class="hotel-actions">
                            <button class="btn btn-secondary btn-xs" onclick="app.showEvidence('${hotel.id}')"><i class="fa-solid fa-circle-info"></i> Tại sao đề xuất?</button>
                            <button class="btn btn-primary btn-xs" onclick="app.selectHotel('${hotel.id}')">Chọn phòng này <i class="fa-solid fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    showEvidence(hotelId) {
        const hotel = this.hotels.find(h => h.id === hotelId);
        alert(`Bằng chứng AI đối chiếu:\n\n- Khách sạn: ${hotel.name}\n- Nguồn dữ liệu: Google Maps API & Booking.com (Cập nhật: 06/2026)\n- Tiêu chuẩn phòng: 4.5 sao\n- Lý do chi tiết: ${hotel.explainStr}`);
    }

    selectHotel(hotelId) {
        // Go to next stage (Itinerary / Error & Recovery)
        this.activateTab('tab-recovery');
    }

    // ==========================================
    // FAILURE & RECOVERY (T6) LOGIC
    // ==========================================
    switchDay(dayNum) {
        this.activeItineraryDay = dayNum;
        
        // Update active tab styles
        document.querySelectorAll('.itinerary-tabs .tab-btn').forEach((btn, idx) => {
            if (idx + 1 === dayNum) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        this.renderItinerary();
    }

    renderItinerary() {
        const container = document.getElementById('activities-timeline-container');
        const alertBox = document.getElementById('itinerary-alert');
        const successBox = document.getElementById('itinerary-success-alert');
        if (!container) return;

        container.innerHTML = '';

        if (this.activeItineraryDay === 1) {
            // Render standard Day 1
            alertBox.classList.add('hidden');
            successBox.classList.add('hidden');
            
            const day1Acts = [
                { time: '13:30', title: 'Đáp chuyến bay xuống Đà Nẵng', desc: 'Nhận hành lý và di chuyển bằng taxi.', duration: '1h' },
                { time: '14:30', title: 'Check-in khách sạn', desc: 'Nghỉ ngơi sau chuyến bay dài.', duration: '1h' },
                { time: '16:00', title: 'Đi dạo bán đảo Sơn Trà', desc: 'Ngắm hoàng hôn từ đỉnh núi.', duration: '2h' },
                { time: '19:00', title: 'Ăn tối hải sản bên bờ biển', desc: 'Tận hưởng ẩm thực tươi ngon.', duration: '1.5h' }
            ];
            
            day1Acts.forEach(act => this.renderNode(container, act));
            
        } else if (this.activeItineraryDay === 2) {
            // Day 2 has the recovery states
            if (this.itineraryState === 'overloaded') {
                alertBox.classList.remove('hidden');
                successBox.classList.add('hidden');
                this.originalActivitiesDay2.forEach(act => this.renderNode(container, act));
            } else {
                alertBox.classList.add('hidden');
                successBox.classList.remove('hidden');
                this.optimizedActivitiesDay2.forEach(act => this.renderNode(container, act));
            }
            
        } else if (this.activeItineraryDay === 3) {
            // Render Day 3 based on state
            alertBox.classList.add('hidden');
            successBox.classList.add('hidden');

            if (this.itineraryState === 'overloaded') {
                this.originalActivitiesDay3.forEach(act => this.renderNode(container, act));
            } else {
                this.recoveredActivitiesDay3.forEach(act => this.renderNode(container, act));
            }
        }
    }

    renderNode(container, act) {
        const movedClass = act.moved ? 'activity-node moved' : 'activity-node';
        const moveBadge = act.moved ? `<span class="act-move-badge"><i class="fa-solid fa-reply"></i> Dời từ Ngày 2</span>` : '';
        
        container.innerHTML += `
            <div class="${movedClass}">
                <div class="node-dot"></div>
                <div class="act-time-details">
                    <h5>${act.title} ${moveBadge}</h5>
                    <p>${act.desc}</p>
                </div>
                <div class="display-flex align-items-center gap-md">
                    <span class="subtext text-muted"><i class="fa-regular fa-clock"></i> ${act.duration}</span>
                    <span class="act-time-tag">${act.time}</span>
                </div>
            </div>
        `;
    }

    optimizeItinerary() {
        this.itineraryState = 'optimized';
        this.renderItinerary();
    }

    undoItineraryOptimization() {
        this.itineraryState = 'overloaded';
        this.renderItinerary();
    }

    dismissItineraryAlert() {
        const alertBox = document.getElementById('itinerary-alert');
        if (alertBox) {
            alertBox.classList.add('hidden');
        }
    }

    // ==========================================
    // AGENCY & AUTONOMY (T9) LOGIC
    // ==========================================
    undoAutofill() {
        // Clear forms to simulate undoing "Act" autonomy level
        alert("Đã hoàn tác tự động điền form. Bạn có thể tự điền thủ công.");
        const inputs = document.querySelectorAll('.form-mock strong');
        inputs.forEach(input => {
            input.innerText = '(Bị trống - Hãy tự điền)';
            input.style.color = 'var(--text-muted)';
        });
    }

    rejectDraft() {
        const card = document.getElementById('booking-draft-card');
        if (card) {
            card.innerHTML = `<div class="draft-title" style="color: var(--color-error);"><i class="fa-solid fa-file-excel"></i> ĐÃ HỦY BẢN NHÁP</div>
            <p>Bản nháp gửi yêu cầu giữ chỗ đã bị xóa bỏ theo ý muốn của bạn.</p>
            <button class="btn btn-secondary btn-xs" onclick="app.resetDraftCard()"><i class="fa-solid fa-rotate-left"></i> Tạo lại nháp</button>`;
        }
    }

    approveDraft() {
        const card = document.getElementById('booking-draft-card');
        if (card) {
            card.innerHTML = `<div class="draft-title" style="color: var(--color-success);"><i class="fa-solid fa-circle-check"></i> ĐÃ GỬI YÊU CẦU GIỮ PHÒNG THÀNH CÔNG!</div>
            <p>Khách sạn TMS Luxury Danang đã nhận được yêu cầu. Phòng Deluxe Ocean View sẽ được giữ tạm thời cho bạn trong vòng 24 giờ tới (Không phát sinh chi phí).</p>`;
        }
    }

    resetDraftCard() {
        const card = document.getElementById('booking-draft-card');
        if (card) {
            card.innerHTML = `
                <div class="draft-title"><i class="fa-solid fa-file-signature"></i> BẢN NHÁP GỬI RESORT</div>
                <p>Đề nghị giữ phòng Deluxe Ocean View cho khách Nguyễn Văn Đoan từ 25/06 - 28/06/2026. Chưa thanh toán.</p>
                <div class="draft-buttons" id="draft-actions-container">
                    <button class="btn btn-secondary btn-xs" onclick="app.rejectDraft()">Hủy nháp</button>
                    <button class="btn btn-primary btn-xs" onclick="app.approveDraft()">Gửi yêu cầu giữ phòng</button>
                </div>
            `;
        }
    }

    simulatePayment() {
        alert("Đang chuyển hướng bạn tới Ngân hàng điện tử qua mã OTP bảo mật...\n\nThanh toán thành công số tiền 4.850.000đ!\n\nVé máy bay khứ hồi và mã đặt phòng khách sạn đã được gửi về email doan.nv@gmail.com.");
    }

    // ==========================================
    // FEEDBACK MATRIX CLICK-TO-HIGHLIGHT LOGIC
    // ==========================================
    highlightFeedbackSource(sourceType) {
        const routeMap = {
            'user-explicit': 'tab-recovery',       // Redirects to recovery where they click "Slow Down"
            'user-implicit': 'tab-onboarding',     // Onboarding has checkboxes & Skip controls
            'system-explicit': 'tab-explainability', // Hotel recommender has explanation badges
            'system-implicit': 'tab-agency'         // Agency has security and affordance cues
        };

        const targetTab = routeMap[sourceType];
        this.activateTab(targetTab);

        // Flash highlight on the target component shortly after routing
        setTimeout(() => {
            let el = null;
            if (sourceType === 'user-explicit') {
                el = document.getElementById('itinerary-alert');
            } else if (sourceType === 'user-implicit') {
                el = document.getElementById('ob-carousel');
            } else if (sourceType === 'system-explicit') {
                el = document.querySelector('.weights-control-panel');
            } else if (sourceType === 'system-implicit') {
                el = document.querySelector('.card-dont-act');
            }

            if (el) {
                el.style.outline = '3px solid var(--color-primary)';
                el.style.transition = 'outline 0.3s ease';
                setTimeout(() => {
                    el.style.outline = 'none';
                }, 1500);
            }
        }, 500);
    }

    // ==========================================
    // DESIGN RATIONALE WRITER & PANEL UPDATER
    // ==========================================
    updateRationaleText() {
        const panel = document.getElementById('rationale-text-panel');
        if (!panel) return;

        let content = '';

        switch (this.currentTab) {
            case 'tab-flow':
                content = `
                    <div class="rationale-header-box">
                        <h3>Mục tiêu của Prototype</h3>
                        <p>VinUni AI20k Batch 02 • Bài Lab Ngày 18</p>
                    </div>
                    
                    <div class="rationale-item-card">
                        <h4><i class="fa-solid fa-circle-info"></i> Lát cắt trải nghiệm AI</h4>
                        <p>Chúng ta chọn lát cắt: <strong>"AI tạo và điều chỉnh lịch trình chuyến đi + chọn khách sạn + đặt dịch vụ"</strong> để làm rõ các tiêu chí Human-Centered AI.</p>
                        <div class="rat-badge-group">
                            <span class="rat-badge-item highlight">Track 1: Travel Planner</span>
                            <span class="rat-badge-item">HCI Design</span>
                        </div>
                    </div>

                    <div class="rationale-item-card">
                        <h4><i class="fa-solid fa-list-check"></i> Điều kiện tối thiểu đã chứng minh</h4>
                        <p>✓ 1 Onboarding Flow (Slide kỳ vọng, bảo mật, giới hạn).<br>
                           ✓ 2 Kịch bản tương tác (Khai thác nhu cầu & Minh bạch gợi ý).<br>
                           ✓ 2 Kịch bản sai sót (Lập lịch quá tải & Tự động phục hồi).<br>
                           ✓ Đầy đủ 3 cấp độ tự chủ: Act / Ask / Don't Act.<br>
                           ✓ Đầy đủ 4 ô trong Ma trận Phản hồi 2×2.</p>
                    </div>
                `;
                break;

            case 'tab-onboarding':
                content = `
                    <div class="rationale-header-box">
                        <h3>Design Rationale: Onboarding (T0)</h3>
                        <p>Thiết lập kỳ vọng & Kiểm soát quyền riêng tư</p>
                    </div>

                    <div class="rationale-item-card">
                        <h4><i class="fa-solid fa-eye"></i> Thiết lập kỳ vọng đúng mức</h4>
                        <p>Slide 2 chỉ rõ giới hạn của AI (Dữ liệu tĩnh đến 06/2026, không tự thanh toán). Điều này tránh tình trạng người dùng tin tưởng thái quá (Over-trust) dẫn tới rủi ro.</p>
                    </div>

                    <div class="rationale-item-card">
                        <h4><i class="fa-solid fa-user-shield"></i> Quyền riêng tư & Kiểm soát trước hành động</h4>
                        <p>Slide 3 cho phép người dùng bật/tắt quyền Location và Email ngay từ đầu. Chúng tôi cung cấp giải thích rõ ràng tại sao cần quyền đó thay vì bắt người dùng điền biểu mẫu dài dòng.</p>
                        <div class="rat-badge-group">
                            <span class="rat-badge-item highlight">Feedforward</span>
                            <span class="rat-badge-item">User Control</span>
                        </div>
                    </div>
                `;
                break;

            case 'tab-context':
                content = `
                    <div class="rationale-header-box">
                        <h3>Design Rationale: Trong tương tác (T2)</h3>
                        <p>Khai thác nhu cầu từng bước</p>
                    </div>

                    <div class="rationale-item-card">
                        <h4><i class="fa-solid fa-circle-question"></i> Tránh phỏng đoán mơ hồ</h4>
                        <p>Khi người dùng nói "Muốn đi Đà Nẵng", AI chưa đủ thông tin. Nếu tự tạo ngay, tỉ lệ sai lệch rất cao. Nhưng nếu hỏi quá nhiều, người dùng sẽ mệt. Do đó, AI chỉ yêu cầu 3 thông tin cốt lõi nhất (Số ngày, Đi cùng ai, Phong cách).</p>
                    </div>

                    <div class="rationale-item-card">
                        <h4><i class="fa-solid fa-circle-info"></i> Giải thích lý do hỏi (Explainability)</h4>
                        <p>Mỗi trường chọn đều có biểu tượng <i class="fa-solid fa-circle-question"></i> <strong>Tại sao cần?</strong> để người dùng hiểu lợi ích của việc cung cấp thông tin.</p>
                    </div>

                    <div class="rationale-item-card">
                        <h4><i class="fa-solid fa-spinner"></i> Trạng thái chờ minh bạch (Active Wait State)</h4>
                        <p>Trong quá trình xử lý, hệ thống hiển thị nhật ký các bước chạy thực tế (Processing Logs) giúp giảm cảm giác chờ đợi và tăng sự tin tưởng của người dùng.</p>
                        <div class="rat-badge-group">
                            <span class="rat-badge-item highlight">Explicit System Feedback</span>
                        </div>
                    </div>
                `;
                break;

            case 'tab-explainability':
                content = `
                    <div class="rationale-header-box">
                        <h3>Design Rationale: Minh bạch gợi ý (T3)</h3>
                        <p>Giải thích & Khả năng tùy biến xếp hạng</p>
                    </div>

                    <div class="rationale-item-card">
                        <h4><i class="fa-solid fa-brain"></i> Lớp giải thích (AI Logic Inspector)</h4>
                        <p>Hệ thống không chỉ đưa ra danh sách khách sạn tĩnh. Trên thẻ khách sạn hàng đầu, AI giải thích rõ ràng lý do xếp vị trí thứ nhất dựa trên phong cách đã chọn của người dùng.</p>
                    </div>

                    <div class="rationale-item-card">
                        <h4><i class="fa-solid fa-sliders"></i> Tinh chỉnh trọng số (Sliders)</h4>
                        <p>Khi các tiêu chí bị xung đột (Gần biển vs. Giá rẻ vs. Đánh giá), người dùng có thể chủ động kéo các thanh trượt để thay đổi mức độ ưu tiên. AI sẽ tự động tính toán lại điểm số và thay đổi thứ hạng trực quan thời gian thực.</p>
                        <div class="rat-badge-group">
                            <span class="rat-badge-item highlight">Two-way Learning Loop</span>
                            <span class="rat-badge-item">Explainable AI (XAI)</span>
                        </div>
                    </div>
                `;
                break;

            case 'tab-recovery':
                content = `
                    <div class="rationale-header-box">
                        <h3>Design Rationale: Phục hồi sai sót (T6)</h3>
                        <p>Phát hiện lịch trình không khả thi & Recovery</p>
                    </div>

                    <div class="rationale-item-card">
                        <h4><i class="fa-solid fa-bell"></i> Phát hiện sai sót thông minh</h4>
                        <p>AI có thể tạo ra một lịch trình quá dày đặc. Hệ thống tự động phân tích và đưa ra cảnh báo cam nổi bật ở Ngày 2 để người dùng chủ động kiểm tra.</p>
                    </div>

                    <div class="rationale-item-card">
                        <h4><i class="fa-solid fa-heart-pulse"></i> Phục hồi lỗi không đứt gãy flow</h4>
                        <p>Thay vì chỉ báo lỗi tĩnh, hệ thống đề xuất nút <strong>"Tự động giãn lịch trình (Slow Down Pace)"</strong>. Khi người dùng click, AI tự động chuyển các hoạt động dư thừa sang Ngày 3, mở rộng thời gian nghỉ ngơi ở Ngày 2.</p>
                    </div>

                    <div class="rationale-item-card">
                        <h4><i class="fa-solid fa-rotate-left"></i> Khả năng hoàn tác (Undo)</h4>
                        <p>Người dùng dễ dàng bấm <strong>"Hoàn tác"</strong> để quay lại trạng thái ban đầu nếu cảm thấy không ưng ý với việc tự động giãn lịch trình của AI.</p>
                        <div class="rat-badge-group">
                            <span class="rat-badge-item highlight">Failure Recovery</span>
                            <span class="rat-badge-item">User Control Override</span>
                        </div>
                    </div>
                `;
                break;

            case 'tab-agency':
                content = `
                    <div class="rationale-header-box">
                        <h3>Design Rationale: Mức độ tự chủ (T9)</h3>
                        <p>Act / Ask / Don't Act dựa theo phân cấp rủi ro</p>
                    </div>

                    <div class="rationale-item-card">
                        <h4><i class="fa-solid fa-bolt"></i> ACT (Tự động thực hiện)</h4>
                        <p>Tự động điền form thông tin cá nhân. <strong>Lý do:</strong> Rủi ro rất thấp, dễ sửa chữa trực tiếp, giúp tiết kiệm thời gian đáng kể cho người dùng.</p>
                    </div>

                    <div class="rationale-item-card">
                        <h4><i class="fa-solid fa-comments"></i> ASK (Hỏi trước khi hành động)</h4>
                        <p>Tạo bản nháp và gửi đề nghị giữ phòng cho resort. <strong>Lý do:</strong> Rủi ro trung bình, ảnh hưởng tới bên thứ ba. AI bắt buộc phải hỏi phê duyệt trước khi gửi đi.</p>
                    </div>

                    <div class="rationale-item-card">
                        <h4><i class="fa-solid fa-circle-xmark"></i> DON'T ACT (Không được tự làm)</h4>
                        <p>Trừ tiền hoặc thanh toán hóa đơn. <strong>Lý do:</strong> Rủi ro mất mát tài chính cao, không thể khôi phục tự động. AI chỉ dẫn hướng đến cổng thanh toán bảo mật của ngân hàng và để người dùng tự xác thực OTP/Vân tay.</p>
                        <div class="rat-badge-group">
                            <span class="rat-badge-item highlight">Autonomy Boundary</span>
                            <span class="rat-badge-item">Risk Assessment</span>
                        </div>
                    </div>
                `;
                break;

            case 'tab-feedback-loop':
                content = `
                    <div class="rationale-header-box">
                        <h3>Hệ thống Phản hồi Hai Chiều 2×2</h3>
                        <p>Chi tiết các điểm tương tác trong Prototype</p>
                    </div>

                    <div class="rationale-item-card">
                        <h4><i class="fa-solid fa-circle-nodes"></i> Vai trò của Phản hồi ngầm định</h4>
                        <p>Phản hồi ngầm định (Implicit) thu thập thông qua hành vi tự nhiên (như bấm Skip khảo sát, bấm Undo khi AI điền form) giúp hệ thống điều chỉnh độ tự tin của thuật toán mà không làm phiền lòng người dùng bằng các khảo sát 5 sao rườm rà.</p>
                    </div>

                    <div class="rationale-item-card">
                        <h4><i class="fa-solid fa-hand-pointer"></i> Hướng dẫn khám phá</h4>
                        <p>Nhấp vào từng ô của Ma trận phản hồi ở màn hình bên trái. Prototype sẽ tự động điều hướng và khoanh vùng nổi bật (Flash Highlight) vị trí tương tác đó trong giao diện.</p>
                    </div>
                `;
                break;

            case 'tab-rationale':
                content = `
                    <div class="rationale-header-box">
                        <h3>Lab Q&A Design Answers</h3>
                        <p>Tài liệu Rationale bằng tiếng Việt cho Giảng viên chấm điểm</p>
                    </div>

                    <div class="rationale-item-card">
                        <h4><i class="fa-solid fa-graduation-cap"></i> Trọng tâm của bài Lab</h4>
                        <p>Bài lab đánh giá năng lực thiết kế giao diện tương tác cho các tình huống mà AI không hoàn hảo (thiếu thông tin, sai sót, rủi ro cao). Prototype này đã thể hiện trọn vẹn cả 10 câu trả lời rationale cần thiết.</p>
                    </div>
                `;
                break;

            case 'tab-demo':
                content = `
                    <div class="rationale-header-box">
                        <h3>Kịch bản Demo 5 Phút</h3>
                        <p>Hướng dẫn chấm thi nhanh cho Hội đồng đánh giá</p>
                    </div>

                    <div class="rationale-item-card">
                        <h4><i class="fa-solid fa-play"></i> Mục tiêu Demo</h4>
                        <p>Chỉ ra cho người đánh giá thấy sự vận hành của 4 giai đoạn vòng đời trải nghiệm AI: Onboarding → During → After → Feedback & Recovery.</p>
                    </div>
                `;
                break;

            default:
                content = '<p>Không có ghi chú thiết kế cho mục này.</p>';
        }

        panel.innerHTML = content;
    }
}

// Instantiate globally
const app = new AITravelPlannerApp();
window.addEventListener('DOMContentLoaded', () => {
    app.init();
});
