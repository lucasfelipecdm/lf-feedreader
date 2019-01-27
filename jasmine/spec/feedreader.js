$(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * This test loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is no empty
         */
        it('has a URL defined and is not empty', function(){
            for (feed in allFeeds){
                expect(allFeeds[feed].url).toBeDefined();
                expect(allFeeds[feed].url).not.toBe('');
            }
        });
        
        /**
         * This test loops through each feed in the allFeeds object and ensures it gas a name defined
         */
        it('has a name defined and is not empty', function(){
            for (feed in allFeeds){
                expect(allFeeds[feed].name).toBeDefined();
                expect(allFeeds[feed].name).not.toBe('');
            }
        });        
    });

    describe('The menu', function(){
        /**
         * This object saves the menu hidden status
         */
        var menuHidden = {
            isHidden: null,
            getStatus: function(){
                this.isHidden = $('body').hasClass('menu-hidden');
            }
        };

        /**
         * This object have a function who trigger the menu icon click
         */
        var menuIcon = {            
            click: function(){
                $('.menu-icon-link').trigger('click');
            }
        };

        /**
         * This test ensures the menu element is hidden by default
         */
        it('the menu element is hidden by default', function(){
            menuHidden.getStatus();           
            expect(menuHidden.isHidden).toBe(true);
        });

         /**
          * This test ensures the menu changes visibility when the menu icon is clicked
          */
        it('the menu visibility changes when the menu icon is clicked', function(){
            menuIcon.click();
            menuHidden.getStatus(); 
            expect(menuHidden.isHidden).toBe(false);
            menuIcon.click();
            menuHidden.getStatus(); 
            expect(menuHidden.isHidden).toBe(true);
        });
    });

    describe('Initial Entries', function(){                
        var whoLoad = 0;

        /**
         * This beforeEach ensures the loadFeed completes its work and load allFeeds before the expect tests runs
         */
        beforeEach(function(done){
            loadFeed(whoLoad, function(){
                done();            
            });
        });

        /**
         * This object get and saves the number of entry element in the feed container
         */
        var feedList = {
            entry: null,
            entryLen: null,
            getEntryFeed: function(){
                this.entry = $('.feed').find('.entry');
                this.entryLen = this.entry.length;
            } 
        };

        /**
         * This test ensures there is at least a single entry element within the feed container
         */
        it('the loadFeed completes its work and feed container has a least a single entry', function(){
            feedList.getEntryFeed();
            expect(feedList.entryLen).toBeGreaterThan(0);
        });
    
    });

    describe('New Feed Selection', function(){        
        var whoLoad = 0;
        var headerContent = [];

        /**
         * This beforeEach ensures the loadFeed completes its work and load allFeeds before the expect tests runs
         * and add the title of header in the headerContent array
         */
        beforeEach(function(done){
            loadFeed(0, function(){                
                headerContent.push($('.header-title').text());
                loadFeed(1, function(){                    
                    headerContent.push($('.header-title').text());
                    done();
                })
            })
        });

        /**
         * This test compare the title of each item in the array and if they are different the test is passed
         */
        it('the content of feed changes when a new feed is called', function(){
            expect(headerContent[0]).not.toBe(headerContent[1]);
        });
    });
}());
