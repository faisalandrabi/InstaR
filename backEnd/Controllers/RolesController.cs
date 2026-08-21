using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR;
using backEnd.Data;
using backEnd.DTOs;
using backEnd.Models;
using backEnd.Hubs;

namespace backEnd.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RolesController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IHubContext<NotificationHub> _hubContext;

    public RolesController(AppDbContext context, IHubContext<NotificationHub> hubContext)
    {
        _context = context;
        _hubContext = hubContext;
    }

    // GET: api/Roles
    [HttpGet]
    public async Task<ActionResult<IEnumerable<RoleDto>>> GetRoles()
    {
        var roles = await _context.Roles
            .Select(r => new RoleDto
            {
                Id = r.Id,
                Name = r.Name,
                Description = r.Description
            })
            .ToListAsync();

        return Ok(roles);
    }

    // GET: api/Roles/5
    [HttpGet("{id}")]
    public async Task<ActionResult<RoleDto>> GetRole(int id)
    {
        var role = await _context.Roles.FindAsync(id);

        if (role == null)
        {
            return NotFound();
        }

        return Ok(new RoleDto
        {
            Id = role.Id,
            Name = role.Name,
            Description = role.Description
        });
    }

    // POST: api/Roles
    [HttpPost]
    public async Task<ActionResult<RoleDto>> CreateRole(CreateRoleDto createRoleDto)
    {
        var role = new Role
        {
            Name = createRoleDto.Name,
            Description = createRoleDto.Description
        };

        _context.Roles.Add(role);
        await _context.SaveChangesAsync();

        var roleDto = new RoleDto
        {
            Id = role.Id,
            Name = role.Name,
            Description = role.Description
        };

        return CreatedAtAction(nameof(GetRole), new { id = role.Id }, roleDto);
    }

    // PUT: api/Roles/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRole(int id, UpdateRoleDto updateRoleDto)
    {
        var role = await _context.Roles.FindAsync(id);
        if (role == null)
        {
            return NotFound();
        }

        role.Name = updateRoleDto.Name;
        role.Description = updateRoleDto.Description;

        await _context.SaveChangesAsync();
        await _hubContext.Clients.All.SendAsync("ReceiveRoleUpdate", role);

        return NoContent();
    }

    // DELETE: api/Roles/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRole(int id)
    {
        var role = await _context.Roles.FindAsync(id);
        if (role == null)
        {
            return NotFound();
        }

        _context.Roles.Remove(role);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
