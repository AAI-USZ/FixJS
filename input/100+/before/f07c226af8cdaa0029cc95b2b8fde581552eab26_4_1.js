function () {

  module("project", {
    setup:function () {
      this.clock = sinon.useFakeTimers();
      this.now = moment();
      this.project = new Project();
    },

    teardown:function () {
      this.clock.restore();
    }
  });

  test("initialize", function () {
    equal(this.project.get("type"), "OpenSource");
    equal(this.project.get("created"), this.now.utc().format());
  });
}