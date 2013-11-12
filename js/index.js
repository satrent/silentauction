(function($) { 
  $(document).ready(function() {
		function Lot(id, title, description, minimum) {
	    var self = this;
      self.id = id;
	    self.title = title;
	    self.description = description;
			self.minimumBid = minimum;
      self.gotoDetails = function() {
        document.location = '/lot/details/' + self.id;
      };
		}

    function LotsVM() {
      var self = this;
      self.lots = ko.observableArray([]);
    }

    var vm = new LotsVM();
    ko.applyBindings(vm);

		$.ajax({
			type: "GET",
			url: "/api/lots/open",
			dataType: "json"
		}).done(function(lots) {
      $.each(lots, function(i, l){
        console.log(l);
        vm.lots.push(new Lot(l._id, l.Title, l.Description, l.MinimumBid));
      });
		});

	});
})(jQuery)



