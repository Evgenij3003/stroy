/*==========================================================================================================================================================================*/
/* Проверка устройства, на котором открыта страница */
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};


function isIE() {
    ua = navigator.userAgent;
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return is_ie;
}
if (isIE()) {
    document.querySelector("body").classList.add("ie");
}
if (isMobile.any()) {
    document.querySelector("body").classList.add("_touch");
}


function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
    if (support == true) {
        document.querySelector("body").classList.add("_webp");
    } else {
        document.querySelector("body").classList.add("_no-webp");
    }
});



/*==========================================================================================================================================================================*/
/* Slider Swiper */
window.onload = function () {
    function bildSliders() {
        let sliders = document.querySelectorAll('[class*="__wrapper"]:not(.swiper-wrapper)');
        if (sliders) {
            sliders.forEach(slider => {
                slider.parentElement.classList.add("swiper");
                slider.classList.add("swiper-wrapper");
                for (const slide of slider.children) {
                    slide.classList.add("swiper-slide");
                }
            });
        }
    }
    bildSliders();


    function initSliders() {
        // Slider. Licenses:
        if (document.querySelector(".slider-licenses")) {
            new Swiper(".slider-licenses", {
                observer: true,
                observeParents: true,
                watchOverflow: true,
                slidesPerView: 1,
                centeredSlides: true,
                spaceBetween: 40,
                speed: 1000,
                keyboard: {
                    enabled: true,                                                           
                    onlyInViewport: true,
                    pageUpDown: true,
                },
                navigation: {
                    nextEl: ".slider-licenses .swiper-arrow_next",
                    prevEl: ".slider-licenses .swiper-arrow_prev"
                },
                pagination: {
                    el: ".slider-licenses__bullets",
                    type: "bullets",
                    clickable: true,
                },
            });
        }

        // Slider. Laboratory:
        if (document.querySelector(".slider-laboratory")) {
            new Swiper(".slider-laboratory", {
                observer: true,
                observeParents: true,
                watchOverflow: true,
                slidesPerView: "auto",
                centeredSlides: true,
                initialSlide: 1,
                spaceBetween: 40,
                speed: 1000,
                keyboard: {
                    enabled: true,                                                           
                    onlyInViewport: true,
                    pageUpDown: true,
                },
                pagination: {
                    el: ".slider-laboratory__bullets",
                    type: "bullets",
                    clickable: true,
                },
                breakpoints: {
                    478: {
                        slidesPerView: "auto",
                    },
                    320: {
                        slidesPerView: 1,
                    }
                },
            });
        }

        // Slider. Examples:
        if (document.querySelector(".slider-examples")) {
            new Swiper(".slider-examples", {
                // autoplay: {
                //     delay: 6000,
                //     disableOnInteraction: false,
                // },
                observer: true,
                observeParents: true,
                watchOverflow: true,
                slidesPerView: 1,
                centeredSlides: true,
                spaceBetween: 50,
                autoHeight: true,
                speed: 1000,
                keyboard: {
                    enabled: true,                                                           
                    onlyInViewport: true,
                    pageUpDown: true,
                },
                navigation: {
                    nextEl: ".content-examples .swiper-arrow_next",
                    prevEl: ".content-examples .swiper-arrow_prev"
                },
                pagination: {
                    el: ".slider-examples__bullets",
                    type: "bullets",
                    clickable: true,
                },
            });
        }
    }
    initSliders();
}



/*==========================================================================================================================================================================*/
/* Динамический Адаптив */
function dynamicAdapt(type) {
	this.type = type;
}


// Функция адаптива:
dynamicAdapt.prototype.init = function () {
	const _this = this;		
	this.оbjects = [];																				// Массив объектов.
	this.daClassname = "_dynamic_adapt_";	
	this.nodes = document.querySelectorAll("[data-da]");											// Массив DOM-элементов.
	for (let i = 0; i < this.nodes.length; i++) {													// Наполнение оbjects объектами.
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}
	this.arraySort(this.оbjects);
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {					// Массив уникальных медиа-запросов.
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});
	for (let i = 0; i < this.mediaQueries.length; i++) {											// Навешивание слушателя на медиа-запрос и вызов обработчика 
		const media = this.mediaQueries[i];															// при первом запуске.
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];			
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {			// Массив объектов с подходящим брейкпоинтом.
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};


// Функция перемещения:
dynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};


// Функция перемещения:
dynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}


// Функция возврата:
dynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}


// Функция получения индекса внутри родителя:
dynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};


// Функция сортировки массива по breakpoint и place по возрастанию для this.type = min по убыванию для this.type = max:
dynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}
				if (a.place === "first" || b.place === "last") {
					return -1;
				}	
				if (a.place === "last" || b.place === "first") {
					return 1;
				}
				return a.place - b.place;
			}	
			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}	
				if (a.place === "first" || b.place === "last") {
					return 1;
				}
				if (a.place === "last" || b.place === "first") {
					return -1;
				}
				return b.place - a.place;
			}	
			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};
const da = new dynamicAdapt("max");
da.init();