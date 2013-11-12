(function($) { 
  $(document).ready(function() {
    function LotsVM() {
      var self = this;
      self.id = ko.observable();
      self.title = ko.observable();
      self.description = ko.observable();
      self.minimumBid = ko.observable();
      self.highBid = ko.observable();
      self.highBidder = ko.observable();
    }

    var vm = new LotsVM();
    ko.applyBindings(vm);
  
    $.ajax({
			type: "GET",
      data: {'lotId': $('#lotId').val()},
			url: "/api/bids/get",
			dataType: "json"
		}).done(function(bids) {
      if (bids) {
        var highBid = 0;
        var highBidder = '';

        $.each(bids, function(i, b) {
          if (b.Amount > highBid) {
            highBid = b.Amount;
            highBidder = b.UserName;        
          }
        });

        vm.highBid(highBid);
        vm.highBidder(highBidder);
      }
		});


		$.ajax({
			type: "GET",
      data: {'id': $('#lotId').val()},
			url: "/api/lot/details",
			dataType: "json"
		}).done(function(l) {
      vm.id(l._id);
      vm.title(l.Title);
      vm.description(l.Description);
      vm.minimumBid(l.MinimumBid);
		});

    $('#makeBid').click(function() {
      var data = {
            LotId: $("#lotId").val(),
            Amount: $("#bidAmount").val(),
            UserName: 'test user'
      };

      $.ajax({
        type: "POST",
        data: {'bid': data},
        url: "/api/bid/put",
        dataType: "json"
      }).done(function(result) {
        alert('bid accepted');      
      });                
    });

	});
})(jQuery)



