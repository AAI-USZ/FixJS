function () {
                expect(mockedWebview.enableCrossSiteXHR).toEqual(true);
                expect(mockedWebview.visible).toEqual(true);
                expect(mockedWebview.active).toEqual(true);
                expect(mockedWebview.zOrder).toEqual(0);
                expect(mockedWebview.setGeometry).toHaveBeenCalledWith(0, 0, screen.width, screen.height);

                expect(mockedApplication.windowVisible).toEqual(true);

                expect(request.init).toHaveBeenCalledWith(mockedWebview);
                expect(mockedWebview.onNetworkResourceRequested).toEqual(request.init(mockedWebview).networkResourceRequestedHandler);
            }