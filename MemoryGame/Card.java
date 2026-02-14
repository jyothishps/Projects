import javax.swing.*;
import java.awt.*;

public class Card extends JButton {
    private int value;
    private String symbol;
    private boolean flipped;
    private boolean matched;
    
    private static final Color BACK_COLOR = new Color(70, 130, 180); // Steel blue
    private static final Color FRONT_COLOR = new Color(255, 255, 255); // White
    private static final Color MATCHED_COLOR = new Color(144, 238, 144); // Light green
    
    // Array of symbols/emojis for the cards
    private static final String[] SYMBOLS = {
        "🐶", "🐱", "🐭", "🐹", 
        "🐰", "🦊", "🐻", "🐼"
    };
    
    public Card(int value) {
        this.value = value;
        this.symbol = SYMBOLS[value - 1]; // value 1-8, array index 0-7
        this.flipped = false;
        this.matched = false;
        
        setPreferredSize(new Dimension(100, 100));
        setFont(new Font("Segoe UI Emoji", Font.PLAIN, 48)); // Larger emoji font
        setFocusPainted(false);
        setBorderPainted(true);
        
        updateAppearance();
    }
    
    public void flip() {
        flipped = !flipped;
        updateAppearance();
    }
    
    private void updateAppearance() {
        if (matched) {
            setBackground(MATCHED_COLOR);
            setFont(new Font("Segoe UI Emoji", Font.BOLD, 48));
            setText("✓");
            setEnabled(false);
        } else if (flipped) {
            setBackground(FRONT_COLOR);
            setFont(new Font("Segoe UI Emoji", Font.PLAIN, 48));
            setText(symbol);
        } else {
            setBackground(BACK_COLOR);
            setFont(new Font("Arial", Font.BOLD, 48));
            setText("?");
        }
    }
    
    public int getValue() {
        return value;
    }
    
    public String getSymbol() {
        return symbol;
    }
    
    public boolean isFlipped() {
        return flipped;
    }
    
    public boolean isMatched() {
        return matched;
    }
    
    public void setMatched(boolean matched) {
        this.matched = matched;
        updateAppearance();
    }
}