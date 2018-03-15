var app = angular.module('plunker', ['nvd3','btford.socket-io'])
.factory('socket', function (socketFactory) {
    var socketConnection = io.connect('http://localhost:3000');
    var socket = socketFactory({
        ioSocket: socketConnection
    });
    return socket;
}).controller('MainCtrl', function($scope, socket) {
    $scope.options = {
        chart: {
            type: 'lineChart',
            height: 150,
            margin : {
                top: 10,
                right: 20,
                bottom: 10,
                left: 55
            },
            x: function(d){ return d.x; },
            y: function(d){ return d.y; },
            useInteractiveGuideline: true,
            duration: 0,    
            yAxis: {
                tickFormat: function(d){
                   return d3.format('.01f')(d);
                }
            },
            showXAxis: false
        }
    };

    $scope.options_G1x = angular.copy($scope.options);
    $scope.options_G1x.chart.yDomain = [-1,1];
    $scope.G1x = [
        {
            values: angular.copy($scope.init_data), 
            key: 'G1x',
            color: '#ff7f0e'
        }];
        
    $scope.options_G1y = angular.copy($scope.options);
    $scope.options_G1y.chart.yDomain = [-1,1];
    $scope.G1y = [
        {
            values: angular.copy($scope.init_data), 
            key: 'G1y',
            color: '#2ca02c' 
        }];
    
    $scope.options_G1z = angular.copy($scope.options);
    $scope.options_G1z.chart.yDomain = [-1,1];
    $scope.G1z = [
        {
            values: angular.copy($scope.init_data), 
            key: 'G1z',
            color: '#7777ff' 
        }];

    $scope.options_G1 = angular.copy($scope.options);
    $scope.options_G1.chart.yDomain = [-1,1];
    $scope.G1 = [
        {
            values: $scope.G1x[0].values, 
            key: 'G1x',
            color: '#ff7f0e' 
        },
        {
            values: $scope.G1y[0].values, 
            key: 'G1y',
            color: '#2ca02c' 
        },
        {
            values: $scope.G1z[0].values, 
            key: 'G1z',
            color: '#7777ff' 
        }
    ];

    socket.on('returnDataG1x', function(data){
        console.log('return');
        $scope.G1x[0].values = data;
        if ($scope.G1x[0].values.length > RANGE) $scope.G1x[0].values.shift();
        $scope.api1x.update();
        $scope.api1.update();
    });
    socket.on('returnDataG1y', function(data){
        console.log('return');
        $scope.G1y[0].values = data;
        if ($scope.G1y[0].values.length > RANGE) $scope.G1y[0].values.shift();
        $scope.api1y.update();
        $scope.api1.update();
    });
    socket.on('returnDataG1x', function(data){
        console.log('return');
        $scope.G1z[0].values = data;
        if ($scope.G1z[0].values.length > RANGE) $scope.G1z[0].values.shift();
        $scope.api1z.update();
        $scope.api1.update();
    });

    setInterval(function(){
        socket.emit('getData');
    }, 100);   
});
