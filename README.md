# otg-team-ermahnerds

#How to get data
1. Check out this branch of search-query
/blackbaud/search-query/otg-evil-no-permissions-query
1. Check out this branch of common-spring-boot
/blackbaud/common-spring-boot/otg-evil-no-permissions-query
1. `gw clean pubL` in common-spring-boot
1. `gw refI` in search-query
1. `gw startElastic` in search-query
1. `gw createSearchIndex` in search-query
1. Open up search-query and go to "segmentation works with non-nested sub-fields" 
spec in SegmentationSpecification component test.
1. Run that test and expect it to fail. Boom. 
You have social data on your local elasticsearch cluster.
1. Check out segmentation-component master.
1. gulp serve that thing.
1. In THIS project, run `skyux build` to get the npm dependencies installed
1. Go to `otg-team-ermahnerds/skyux-spa-hotshot/node_modules/@blackbaud/skyux-builder/config/webpack/serve.webpack.config.js` 
and add the following property after publicPath in the devServer object: `proxy: {
                                                                                    '/api': {
                                                                                        "target": {
                                                                                            "host": "localhost",
                                                                                            "protocol": 'https:',
                                                                                            "port": 9007
                                                                                        },
                                                                                        secure: false
                                                                                    }
                                                                                }
                                                                              },`
                                                                              
1. Take a deep breath, you are almost done.
1. In THIS project, run `skyux serve --launch local` 
1. PROFIT.