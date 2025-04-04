//since it was a small application, I did not use a database, but in a real application, I would use a database to store the data.
using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private static List<TodoItem> tasks = new();
                private static int nextId = 1;

        [HttpGet]
        public ActionResult<IEnumerable<TodoItem>> GetAll() => Ok(tasks);

        [HttpPost]
        public ActionResult<TodoItem> Create(TodoItem item)
        {
            item.Id = nextId++;
            tasks.Add(item);
            return CreatedAtAction(nameof(GetAll), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, TodoItem updated)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();

            task.Task = updated.Task;
            task.IsCompleted = updated.IsCompleted;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();

            tasks.Remove(task);
            return NoContent();
        }
    }
}
