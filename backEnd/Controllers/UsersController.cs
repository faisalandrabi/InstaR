using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backEnd.Data;
using backEnd.DTOs;
using backEnd.Models;
using Microsoft.AspNetCore.SignalR;
using backEnd.Hubs;

namespace backEnd.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IHubContext<NotificationHub> _hubContext;
    

    public UsersController(AppDbContext context , IHubContext<NotificationHub> hubContext)
    {
        _context = context;
        _hubContext = hubContext;
    }

    // GET: api/Users
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
    {
        var users = await _context.Users
            .Include(u => u.Role)
            .Select(u => new UserDto
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                RoleId = u.RoleId,
                RoleName = u.Role != null ? u.Role.Name : null,
                CreatedAt = u.CreatedAt
            })
            .ToListAsync();

        return Ok(users);
    }

    // GET: api/Users/5
    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetUser(int id)
    {
        var user = await _context.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Id == id);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(new UserDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            RoleId = user.RoleId,
            RoleName = user.Role?.Name,
            CreatedAt = user.CreatedAt
        });
    }

    // POST: api/Users
    [HttpPost]
    public async Task<ActionResult<UserDto>> CreateUser(CreateUserDto createUserDto)
    {
        var roleExists = await _context.Roles.AnyAsync(r => r.Id == createUserDto.RoleId);
        if (!roleExists)
        {
            return BadRequest($"Role with ID {createUserDto.RoleId} does not exist.");
        }

        var user = new User
        {
            Username = createUserDto.Username,
            Email = createUserDto.Email,
            PasswordHash = createUserDto.Password, // Simple hash/storage for demonstration
            RoleId = createUserDto.RoleId,
            CreatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        // Reload role for DTO return
        await _context.Entry(user).Reference(u => u.Role).LoadAsync();

        var userDto = new UserDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            RoleId = user.RoleId,
            RoleName = user.Role?.Name,
            CreatedAt = user.CreatedAt
        };
        await _hubContext.Clients.All.SendAsync("ReceiveUserUpdate", user);
        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, userDto);
        
    }

    // PUT: api/Users/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, UpdateUserDto updateUserDto)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        var roleExists = await _context.Roles.AnyAsync(r => r.Id == updateUserDto.RoleId);
        if (!roleExists)
        {
            return BadRequest($"Role with ID {updateUserDto.RoleId} does not exist.");
        }

        user.Username = updateUserDto.Username;
        user.Email = updateUserDto.Email;
        user.RoleId = updateUserDto.RoleId;

        await _context.SaveChangesAsync();
        await _hubContext.Clients.All.SendAsync("ReceiveUserUpdate", user);

        return NoContent();
    }

    // DELETE: api/Users/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        _context.Users.Remove(user);
         await _context.SaveChangesAsync();
         await _hubContext.Clients.All.SendAsync("ReceiveUserUpdate", user);

        return NoContent();
    }
}
